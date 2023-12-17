import { SlashCommandBuilder } from 'discord.js';

const hydroCommands = {
  data: new SlashCommandBuilder()
    .setName('hydro')
    .setDescription(' bottle do you want to choose')
    .addStringOption((option) =>
      option
        .setName('bottle')
        .setDescription('hydroflask bottle')
        .setRequired(true)
        .addChoices(
          {
            name: '500ml Bottle',
            value: '500ml bottle',
          },
          {
            name: '1L Bottle',
            value: '1L bottle',
          }
        )
    ),

  async execute(interaction) {
    const bottle = interaction.options.getString('bottle');
    await interaction.reply({
      content: `You ordered a ${bottle}`,
      ephemeral: true,
    });
  },
};

export default hydroCommands;

// const commands = [
//   {
//     name: 'hydro',
//     description: 'Which bottle do you want to choose',
//     options: [
//       {
//         name: 'small-bottle',
//         description: 'small hydroflask bottle',
//         type: 3,
//         choices: [
//           {
//             name: 'Black-bottle',
//             value: 'small-black-bottle',
//           },
//           {
//             name: 'Blue-bottle',
//             value: 'small-blue-bottle',
//           },
//         ]
//       },
//       {
//         name: 'large-bottle',
//         description: 'large hydroflask bottle',
//         type: 3,
//         choices: [
//           {
//             name: 'Black-bottle',
//             value: 'large-black-bottle',
//           },
//           {
//             name: 'Blue-bottle',
//             value: 'large-blue-bottle',
//           },
//         ]
//       }
//     ]
//   },
//   {
//     name: 'denton',
//     description: 'caitlin',
//   },
// ];
