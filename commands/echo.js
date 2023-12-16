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
			.setMinLength(2),
	)
	.addNumberOption((option) =>
		option
			.setName('number')
			.setDescription('Number that gets echoed back')
			.setMaxValue(100)
			.setMinValue(1),
	);
export default echoCommands.toJSON();
