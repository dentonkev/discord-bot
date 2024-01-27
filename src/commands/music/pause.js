import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const pauseCommand = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the current song'),

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

		if (queue.node.isPaused()) {
			return await interaction.reply({
				content: 'The song is already paused',
			});
		}

		if (!queue.node.isPlaying()) {
			return await interaction.reply({
				content: 'No song is currently playing',
			});
		}

		try {
			const track = queue.currentTrack;
			queue.node.pause();

			const embed = new EmbedBuilder()
				.setTitle('Pausing')
				.setDescription(`Pausing **${track.title}** - ${track.author} (${track.duration})`)
				.setColor(0xeef9a5);

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

export default pauseCommand;
