import { SlashCommandBuilder } from 'discord.js';

const drinkCommand = new SlashCommandBuilder()
	.setName('drink')
	.setDescription('Type of drink');

export default drinkCommand.toJSON();
