import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer, useQueue, QueryType } from 'discord-player';

const playCommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song immediately')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('Name of song you want to play')
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

    const vc = player.client.channels.resolve(channel);
    let queue = useQueue(interaction.guildId);

    if (!queue) {
      queue = player.nodes.create(vc.guild, {
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
    }

    if (!queue.channel) {
      queue.connect(vc);
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

      queue.node.play(songSearch.tracks[0], { queue: false });

      const track = songSearch.tracks[0];

      await interaction.editReply({
        content: `Playing **${track.title}** - ${track.author} (${track.duration})`,
      });
    } catch (error) {
      await interaction.editReply({
        content: 'An error has occured during execution',
      });
      console.log(error);
    }
  },
};

export default playCommand;
