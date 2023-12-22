import { ChannelType, SlashCommandBuilder } from 'discord.js';

const channelCommand = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('channel command')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Channel')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice),
		),

	async execute(interaction) {},
};

export default channelCommand;
