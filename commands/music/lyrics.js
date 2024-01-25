import { lyricsExtractor } from '@discord-player/extractor';
import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const lyricsCommand = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Lyrics of current song or specified song')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('Name of song that you want lyrics for')
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const clientChannel = interaction.guild.members.me.voice.channel;

    try {
      const queue = useQueue(interaction.guildId);
      let song = interaction.options.getString('song');

      if (song === null && !clientChannel) {
        return await interaction.editReply({
          content: 'No song is currently playing',
        });
      }

      if (song === null && !queue.node.isPlaying()) {
        return await interaction.editReply({
          content: 'No song is currently playing',
        });
      }

      if (song === null) {
        song = queue.currentTrack.title;
        song += ` - ${queue.currentTrack.author}`;
      }

      const lyricsClient = lyricsExtractor();
      const lyrics = await lyricsClient.search(song).catch((error) => null);

      if (lyrics === null) {
        return await interaction.editReply({
          content: `No lyrics found for **${song}**`,
        });
      }

      const trimmedLyrics = lyrics.lyrics.substring(0, 2000);

      const embed = new EmbedBuilder()
        .setTitle(`${song}`)
        .setDescription(`${trimmedLyrics}`);

      await interaction.editReply({ embeds: [embed]});
      
    } catch (error) {
      await interaction.editReply({
        content: 'An error has occured during execution',
      });
      console.log(error);
    }
  },
};

export default lyricsCommand;
