import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const skipCommand = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip current song'),

	async execute(interaction) {
		const queue = useQueue(interaction.guildId);
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return await interaction.reply({
				content: 'You must be in a voice channel to use this command',
				ephemeral: true,
			});
		}

		if (!queue.isPlaying()) {
			return await interaction.reply({
				content: 'Nothing is currently being played',
				ephemeral: true,
			});
		}

		if (queue.isEmpty()) {
			return await interaction.reply({
				content: 'Nothing in the queue',
				ephemeral: true,
			});
		}

		try {
			queue.node.skip();
			await interaction.reply({
				content: 'Successfully skipped to the next song in the queue',
			});
		}
		catch (error) {
			await interaction.reply({
				content: 'An error has occured during execution',
			});
		}
	},
};

export default skipCommand;
