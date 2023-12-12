import { SlashCommandBuilder } from 'discord.js';

const gunCommand = new SlashCommandBuilder()
  .setName('remove')
  .setDescription('Remove a user');

export default gunCommand.toJSON();
