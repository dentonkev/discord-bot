import { SlashCommandBuilder } from 'discord.js';

const pingCommand = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Responds with pong!');

export default pingCommand.toJSON();
