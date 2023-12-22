import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const queueCommand = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('View the current queue'),

	async execute(interaction) {
		const queue = useQueue(interaction.guildId);
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return await interaction.reply({
				content: 'You must be in a voice channel to use this command',
				ephemeral: true,
			});
		}

		const queueArray = queue.tracks.toArray();
	},
};

export default queueCommand;
