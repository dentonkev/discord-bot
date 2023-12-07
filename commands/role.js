import { SlashCommandBuilder } from 'discord.js';

const roleCommand = new SlashCommandBuilder()
	.setName('addrole')
	.setDescription('Add a role to a user')
	.addRoleOption((option) =>
		option
			.setName('newrole')
			.setDescription('Adds the new Role')
			.setRequired(true),
	);

export default roleCommand.toJSON();