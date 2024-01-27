import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const removeCommand = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a song from the queue')
		.addNumberOption((option) =>
			option
				.setName('position')
				.setDescription('The position of the song in queue that you want to remove')
				.setRequired(true),
		),

	async execute(interaction) {
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

		const queue = useQueue(interaction.guildId);
		const position = interaction.options.getNumber('position');
		const positionIndex = position - 1;

		if (position > queue.getSize() || position < 1) {
			return await interaction.reply({
				content: `${position} is not a valid position in the queue`,
			});
		}

		try {
			const track = queue.tracks.data[positionIndex];
			queue.removeTrack(positionIndex);

			const embed = new EmbedBuilder()
				.setTitle(`${track.title}`)
				.setDescription(`Removing ${track.title} - ${track.author} (${track.duration}) from the queue.`)
				.setAuthor({ name: `${track.author}` })
				.setURL(`${track.url}`)
				.setColor(0xdc2823);

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

export default removeCommand;