import { QueryType, useMainPlayer } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

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

      await interaction.editReply({
        content: `Enqueueing **${res.track.title}** - ${res.track.author} (${res.track.duration})`,
      });
    } catch (error) {
      await interaction.editReply({
        content: 'An error has occured during execution',
      });

      console.log(error);
    }
  },
};

export default queueCommand;
