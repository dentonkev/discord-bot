import { SlashCommandBuilder } from 'discord.js';

const userCommand = new SlashCommandBuilder()
	.setName('user')
	.setDescription('User command')
	.addUserOption((option) =>
		option
			.setName('user')
			.setDescription('User')
			.setRequired(true),
	);

export default userCommand.toJSON();