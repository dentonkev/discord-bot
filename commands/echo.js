import { SlashCommandBuilder } from 'discord.js';

const echoCommands = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Echoes what user has just inputted')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('Message that gets echoed back')
      .setRequired(true)
      .setMaxLength(30)
      .setMinLength(2)
  );

export default echoCommands.toJSON();
