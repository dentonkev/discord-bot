import { SlashCommandBuilder } from 'discord.js';

const removeCommand = new SlashCommandBuilder()
  .setName('remove')
  .setDescription('Remove a user')
  .addSubcommand((cmd) =>
    cmd
      .setName('kick')
      .setDescription('Kick a user group denton-group')
      .addUserOption((user) =>
        user
          .setName('user')
          .setDescription('user to be kicked')
          .setRequired(true)
      )
  )

  .addSubcommand((cmd) =>
    cmd
      .setName('ban')
      .setDescription('Ban a user group denton-group')
      .addUserOption((user) =>
        user
          .setName('user')
          .setDescription('user to be banned')
          .setRequired(true)
      )
  );
export default removeCommand.toJSON();
