import {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';

const removeCommand = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a user')
		.addSubcommand((cmd) =>
			cmd
				.setName('kick')
				.setDescription('Kick a user')
				.addUserOption((user) =>
					user
						.setName('user')
						.setDescription('user to be kicked')
						.setRequired(true),
				),
		)

		.addSubcommand((cmd) =>
			cmd
				.setName('ban')
				.setDescription('Ban a user')
				.addUserOption((user) =>
					user
						.setName('user')
						.setDescription('user to be banned')
						.setRequired(true),
				),
		),

	async execute(interaction) {
		const banConfirm = new ButtonBuilder()
			.setCustomId('ban')
			.setLabel('Ban')
			.setStyle(ButtonStyle.Danger)
			.setEmoji({ name: '🔨' });

		const kickConfirm = new ButtonBuilder()
			.setCustomId('kick')
			.setLabel('Kick')
			.setStyle(ButtonStyle.Danger)
			.setEmoji({ name: '🔨' });

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary)
			.setEmoji({ name: '✋' });

		if (interaction.options.getSubcommand() === 'kick') {
			const user = interaction.options.getUser('user');
			const row = new ActionRowBuilder().addComponents(kickConfirm, cancel);

			const response = await interaction.reply({
				content: `Confirm kick on ${user.displayName}`,
				components: [row],
			});

			try {
				const confirmation = await response.awaitMessageComponent({
					filter: (i) => i.user.id === interaction.user.id,
					time: 60000,
				});

				if (confirmation.customId === 'kick') {
					await interaction.guild.members.kick(user);
					await confirmation.update({
						content: `${user} has been kicked`,
						components: [],
					});
				}
				else if (confirmation.customId === 'cancel') {
					await confirmation.update({
						content: 'Kick command cancelled',
						components: [],
					});
				}
			}
			catch (error) {
				await interaction.editReply({
					content: 'No confirmation receieved for 1 min',
					components: [],
				});
			}
		}

		if (interaction.options.getSubcommand() === 'ban') {
			const user = interaction.options.getUser('user');
			const row = new ActionRowBuilder().addComponents(banConfirm, cancel);

			const response = await interaction.reply({
				content: `Confirm ban on ${user.displayName}`,
				components: [row],
			});

			try {
				const confirmation = await response.awaitMessageComponent({
					filter: (i) => i.user.id === interaction.user.id,
					time: 60000,
				});

				if (confirmation.customId === 'ban') {
					interaction.guild.members.ban(user);
					await confirmation.update({
						content: `${user} has been banned`,
						components: [],
					});
				}
				else if (confirmation.customId === 'cancel') {
					await confirmation.update({
						content: 'Ban command cancelled',
						components: [],
					});
				}
			}
			catch (error) {
				await interaction.editReply({
					content: 'No confirmation receieved for 1 min',
					components: [],
				});
			}
		}
	},
};

export default removeCommand;
