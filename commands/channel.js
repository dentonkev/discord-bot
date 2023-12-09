import { ChannelType, SlashCommandBuilder } from 'discord.js';

const channelCommand = new SlashCommandBuilder()
  .setName('channel')
  .setDescription('channel command')
  .addChannelOption((option) =>
    option
      .setName('channel')
      .setDescription('Channel')
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildVoice)
  );

export default channelCommand.toJSON();
