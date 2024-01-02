import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer } from 'discord-player';

const playCommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song immediately')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('Name of song you want to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.editReply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    const clientChannel = interaction.guild.members.me.voice.channel;

    if (!clientChannel) {
      return await interaction.editReply({
        content: 'I must be in your voice channel to use this command',
        ephemeral: true,
      });
    }

    const song = interaction.options.getString('song');
  },
};

export default playCommand;
