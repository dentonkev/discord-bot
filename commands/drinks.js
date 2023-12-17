import { SlashCommandBuilder } from 'discord.js';

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
          .setValue('coffee')
          .setEmoji({ name: '☕' }),

        new StringSelectMenuOptionBuilder()
          .setLabel('Coke')
          .setValue('coke')
          .setEmoji({ name: '🥤' }),

        new StringSelectMenuOptionBuilder()
          .setLabel('Bubble tea')
          .setValue('bubble-tea')
          .setEmoji({ name: '🧋' }),

        new StringSelectMenuOptionBuilder()
          .setLabel('Sugar Cane')
          .setValue('sugar-cane')
          .setEmoji({ name: '🍹' })
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
