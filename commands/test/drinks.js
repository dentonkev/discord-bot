import {
	SlashCommandBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
	ComponentType,
} from 'discord.js';

const drinkCommand = {
	data: new SlashCommandBuilder()
		.setName('drink')
		.setDescription('Type of drink'),

	async execute(interaction) {
		const menu = new StringSelectMenuBuilder()
			.setCustomId('drink-choice')
			.setPlaceholder('Choose your favourite drinks')
			.setMaxValues(1)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Coffee')
					.setValue('Coffee ☕')
					.setEmoji({ name: '☕' }),

				new StringSelectMenuOptionBuilder()
					.setLabel('Coke')
					.setValue('Coke 🥤')
					.setEmoji({ name: '🥤' }),

				new StringSelectMenuOptionBuilder()
					.setLabel('Bubble tea')
					.setValue('Bubble tea 🧋')
					.setEmoji({ name: '🧋' }),

				new StringSelectMenuOptionBuilder()
					.setLabel('Sugar Cane')
					.setValue('Sugar Cane 🍹')
					.setEmoji({ name: '🍹' }),
			);

		const row = new ActionRowBuilder().addComponents(menu);
		const response = await interaction.reply({ components: [row] });

		// returns an InteractionCollector
		const collector = response.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			filter: (i) => i.user.id === interaction.user.id,
			time: 60000,
		});

		collector.on('collect', async (i) => {
			const selection = i.values;
			await i.reply(`${i.user} chose ${selection}`);
		});
	},
};

export default drinkCommand;
