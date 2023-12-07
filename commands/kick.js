import { SlashCommandBuilder } from 'discord.js';

const removeCommand = new SlashCommandBuilder()
	.setName('remove')
	.setDescription('Remove a user')
	.addSubcommandGroup((group) =>
		group
			.setName('denton-group')
			.setDescription('Dentons group')

			.addSubcommand((cmd) =>
				cmd
					.setName('kick')
					.setDescription('Kick a user group denton-group')
					.addUserOption((user) =>
						user.setName('user').setDescription('user to be kicked'),
					),
			)

			.addSubcommand((cmd) =>
				cmd
					.setName('ban')
					.setDescription('Ban a user group denton-group')
					.addUserOption((user) =>
						user.setName('user').setDescription('user to be banned'),
					),
			),
	)

	.addSubcommandGroup((group) =>
		group
			.setName('caitlin-group')
			.setDescription('Caitlins group')

			.addSubcommand((cmd) =>
				cmd
					.setName('kick')
					.setDescription('Kick a user group caitlin-group')
					.addUserOption((user) =>
						user.setName('user').setDescription('user to be kicked'),
					),
			)

			.addSubcommand((cmd) =>
				cmd
					.setName('ban')
					.setDescription('Ban a user group caitlin-group')
					.addUserOption((user) =>
						user.setName('user').setDescription('user to be banned'),
					),
			),
	);

export default removeCommand.toJSON();
