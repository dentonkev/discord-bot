import { SlashCommandBuilder } from 'discord.js';

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responds with pong!'),

  async execute(interaction) {
    await interaction.reply({ content: 'pong!' });
    await interaction.followUp({ content: 'pong number 2' });
    await interaction.deleteReply();
  },
};

export default pingCommand;

// ping command
// if (interaction.commandName === 'ping') {
//   await interaction.reply({ content: 'pong!' });
//   await interaction.followUp({ content: 'pong number 2' });
//   await interaction.deleteReply();
// }

// if (interaction.commandName === 'ping') {
//   await interaction.reply({ content: 'pong!' });
//   const message = await interaction.fetchReply();
//   console.log(message.content);
// }

// if (interaction.commandName === 'ping') {
//   interaction.reply({ content: 'pong!' });
//   setTimeout(() => {
//     interaction.editReply({ content: 'pong edited!' });
//   }, 2000);
// }

// if (interaction.commandName === 'ping') {
//   interaction.deferReply({ ephemeral: true });
//   setTimeout(() => {
//     interaction.editReply({ content: 'pong after 4 seconds!' });
//   }, 4000);
// }
