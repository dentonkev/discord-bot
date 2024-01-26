import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const pauseCommand = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current song'),

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

    if (clientChannel !== channel){
      return await interaction.reply({
        content: 'I must be in your voice channel to use this command',
        ephemeral: true,
      });
    }

    if (queue.node.isPaused()) {
      return await interaction.reply({
        content: 'The song is already paused',
      });
    }

    if (!queue.node.isPlaying()) {
      return await interaction.reply({
        content: 'No song is currently playing',
      });
    }

    try {
      queue.node.pause();
      await interaction.reply({ content: 'Paused' });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default pauseCommand;
