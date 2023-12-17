import { SlashCommandBuilder } from 'discord.js';

const echoCommands = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echoes what user has just inputted')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Message that gets echoed back')
        .setRequired(true)
        .setMaxLength(30)
        .setMinLength(2)
    )
    .addNumberOption((option) =>
      option
        .setName('number')
        .setDescription('Number that gets echoed back')
        .setMaxValue(100)
        .setMinValue(1)
    ),

  async execute(interaction) {
    const message = interaction.options.getString('message');
    const number = interaction.options.getNumber('number');
    if (number === undefined) {
      await interaction.reply(`${message}`);
    } else {
      await interaction.reply(`${message}, ${number}`);
    }
  },
};

export default echoCommands;
