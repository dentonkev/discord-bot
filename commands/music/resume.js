import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const resumeCommand = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the song that is currently paused'),

  async execute(interaction) {
    const queue = useQueue(interaction.guildId);
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    if (queue.node.isPlaying()) {
      return await interaction.replay({
        content: 'Song is already playing',
      });
    }

    if (!queue.node.isPaused()) {
      return await interaction.replay({
        content: 'The song is not currently paused',
      });
    }

    try {
      queue.node.resume();
      await interaction.reply({
        content: 'Song has been resumed successfully',
      });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default resumeCommand;
