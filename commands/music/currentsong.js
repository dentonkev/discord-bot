import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const currentsongCommand = {
  data: new SlashCommandBuilder()
    .setName('currentsong')
    .setDescription('The song that is currently playing'),

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

    if (clientChannel !== channel) {
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
      const track = queue.currentTrack;

      const embed = new EmbedBuilder()
        .setTitle(`${track.title}`)
        .setDescription(
          `**${track.title}** - ${track.author} (${track.duration}) is currently playing`
        )

        .setURL(track.url)
        .setAuthor({ name: `${track.author}` });

      if (track.url.includes('spotify')) {
        embed
          .setColor(0x1db954)
          .setThumbnail(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/25px-Spotify_icon.svg.png'
          );
      } else if (track.url.includes('youtube')) {
        embed
          .setColor(0xcd201f)
          .setThumbnail(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/33px-YouTube_social_white_square_%282017%29.svg.png'
          );
      }

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });

      console.log(error);
    }
  },
};

export default currentsongCommand;
