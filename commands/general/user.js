import { SlashCommandBuilder } from 'discord.js';

const userCommand = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('User command')
    .addUserOption((option) =>
      option.setName('user').setDescription('User').setRequired(true)
    ),
  async execute(interaction) {},
};

export default userCommand;
