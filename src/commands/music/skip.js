import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const skipCommand = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),

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

		if (!queue.isPlaying()) {
			return await interaction.reply({
				content: 'Nothing is currently being played',
				ephemeral: true,
			});
		}

		if (queue.getSize() === 0) {
			return await interaction.reply({
				content: 'Nothing in the queue',
				ephemeral: true,
			});
		}

		try {
			const queueTracks = queue.tracks.toArray();
			const nextTrack = queueTracks[0];

			queue.node.skip();

			const embed = new EmbedBuilder()
				.setTitle('Skipping')
				.setDescription(`Successfully skipping to **${nextTrack.title}** - ${nextTrack.author} (${nextTrack.duration})`)
				.setColor(0xeef9a5);

			await interaction.reply({ embeds: [embed] });

		}
		catch (error) {
			await interaction.reply({
				content: 'An error has occured during execution',
			});
		}
	},
};

export default skipCommand;
