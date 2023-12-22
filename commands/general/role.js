import { SlashCommandBuilder } from 'discord.js';

const roleCommand = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Add a role to a user')
		.addRoleOption((option) =>
			option
				.setName('newrole')
				.setDescription('Adds the new Role')
				.setRequired(true),
		),

	async execute(interaction) {},
};

export default roleCommand;
