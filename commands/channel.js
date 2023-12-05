import { SlashCommandBuilder } from "discord.js";

const channelCommand = new SlashCommandBuilder()
  .setName('channel')
  .setDescription('channel command')
  .addChannelOption((option) => 
    option
    .setName('channel')
    .setDescription('Chanell') 
    .setRequired(true)
);

export default channelCommand.toJSON();