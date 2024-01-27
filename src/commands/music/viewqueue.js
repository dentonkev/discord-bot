import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const viewQueueCommand = {
	data: new SlashCommandBuilder()
		.setName('viewqueue')
		.setDescription('View the queue'),

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

		if (queue.isEmpty()) {
			return await interaction.reply({
				content: 'No tracks in the queue',
			});
		}

		try {
			const queueArray = queue.tracks.data;

			let queueList = '';

			for (let i = 0; i < queueArray.length; i++) {
				const track = queueArray[i];

				queueList += `${i + 1}. ${track.title} - ${track.author} (${track.duration})\n`;
			}

			const embed = new EmbedBuilder()
				.setTitle('Current Queue')
				.setDescription(`${queueList}`)
				.setColor(0x9bd5ef);

			await interaction.reply({ embeds: [embed] });

		}
		catch (error) {
			await interaction.reply({
				content: 'An error has occured during execution',
			});

			console.log(error);
		}
	},
};

export default viewQueueCommand;
