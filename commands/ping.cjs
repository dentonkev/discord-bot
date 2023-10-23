const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
			.setName('ping')
			.setDescription('This will respond with pong!'),

		async execute(interation) {
			await interation.reply('Pong');
		},
};