import { lyricsExtractor } from '@discord-player/extractor';
import { useQueue } from 'discord-player';
import { SlashCommandBuilder, flatten } from 'discord.js';

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
    const queue = useQueue(interaction.guildId);
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    const clientChannel = interaction.guild.members.me.voice.channel;

    if (!clientChannel) {
      return await interaction.reply({
        content: 'I must be in your voice channel to use this command',
        ephemeral: true,
      });
    }

    if (!queue.node.isPlaying()) {
      return await interaction.reply({
        content: 'No song is currently playing',
      });
    }

    try {
      let song = interaction.options.getString('song');

      if (song === null) {
        song = queue.currentTrack.title;
        song += ` - ${queue.currentTrack.author}`;
      }

      const lyricsClient = lyricsExtractor();
      const lyrics = await lyricsClient.search(song).catch(() => null);

      if (lyrics === null) {
        return await interaction.reply({
          content: `No lyrics found for **${song}**`,
        });
      }

      const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

      await interaction.reply({
        content: trimmedLyrics,
      });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
      console.log(error);
    }
  },
};

export default lyricsCommand;
