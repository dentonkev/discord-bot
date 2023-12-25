import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const restartCommand = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Lyrics of the song that is currently playing'),

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

export default restartCommand;
