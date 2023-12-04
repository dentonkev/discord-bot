import { SlashCommandBuilder } from "discord.js";

const coffeeCommands = new SlashCommandBuilder()
  .setName('coffee')
  .setDescription('Coffee cup ')
  .addStringOption((option) => 
    option
    .setName('mug')
    .setDescription('Mug that insulates')
    .setRequired(true)
    .setChoices( 
      {
        name: '177ml Cup',
        value: '177ml cup'
      },
      {
        name: '354ml Cup',
        value: '354ml cup'
      }
    )
);

export default coffeeCommands.toJSON();
