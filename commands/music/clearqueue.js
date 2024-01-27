import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const clearQueueCommand = {
  data: new SlashCommandBuilder()
    .setName('clearqueue')
    .setDescription('Remove all the songs in the queue'),

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

    if (queue.getSize() === 0) {
      return await interaction.reply({
        content: 'Queue is already empty',
      });
    }

    try {
      queue.clear();

      const embed = new EmbedBuilder()
        .setTitle('Clearing')
        .setDescription(`Clearing all songs from the queue`)
        .setColor(0xeef9a5);

      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default clearQueueCommand;
