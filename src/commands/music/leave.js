import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const leaveCommand = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Bot will leave the voice call it is currently in'),

	async execute(interaction) {
		const queue = useQueue(interaction.guildId);
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return await interaction.reply({
				content: 'You must be in a voice channel to use this command',
				ephemeral: true,
			});
		}

		const clientChannel = interaction.guild.members.me.voice.channel;

		if (clientChannel !== channel) {
			return await interaction.reply({
				content: 'I must be in your voice channel to use this command',
				ephemeral: true,
			});
		}

		try {
			queue.delete();
			await interaction.reply({ content: 'Leaving the voice call' });

		}
		catch (error) {
			await interaction.reply({
				content: 'An error has occured during execution',
			});
		}
	},
};

export default leaveCommand;
