import { QueryType, useMainPlayer, useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const queueCommand = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Add a song to the queue')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('Name of song you want to enqueue')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.editReply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    const song = interaction.options.getString('song');

    try {
      const songSearch = await player.search(song, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });

      if (!songSearch || !songSearch.hasTracks() || songSearch.isEmpty()) {
        return await interaction.editReply({
          content: `${song} could not be found`,
        });
      }

      const res = await player.play(channel, songSearch, {
        nodeOptions: {
          metadata: {
            channel: interaction.channel,
            client: interaction.guild.members.me,
            requestedBy: interaction.user,
          },
          bufferingTimeout: 15000,
          leaveOnStop: true,
          leaveOnStopCooldown: 5000,
          leaveOnEnd: true,
          leaveOnEndCooldown: 15000,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          skipOnNoStream: true,
        },
      });

      const track = res.track;
      const queue = useQueue(interaction.guildId);
      const size = queue.tracks.data.length;

      const embed = new EmbedBuilder()
        .setTitle(`${track.title}`)
        .setDescription(
          `Enqueueing ${track.title} - ${track.author} (${track.duration})`
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

      if (size === 0) {
        embed.setDescription(`Playing ${track.title} - ${track.author} (${track.duration})`);
      }

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      await interaction.editReply({
        content: 'An error has occured during execution',
      });

      console.log(error);
    }
  },
};

export default queueCommand;