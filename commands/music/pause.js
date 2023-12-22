import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const pauseCommand = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the song that is currently playing'),

  async execute(interaction) {
    const queue = useQueue(interaction.guildId);
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    if (queue.node.isPaused()) {
      return await interaction.replay({
        content: 'The song is already paused',
      });
    }

    if (!queue.node.isPlaying()) {
      return await interaction.replay({
        content: 'No song is currently playing',
      });
    }

    try {
      queue.node.pause();
      await interaction.reply({ content: 'Song has been paused successfully' });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default pauseCommand;