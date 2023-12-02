import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('This will respond with pong!'),

	async execute(interaction) {
		await interaction.reply('Pong');
	},
};