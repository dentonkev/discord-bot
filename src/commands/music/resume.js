import { useQueue } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const resumeCommand = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the song that is currently paused'),

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

    if (!clientChannel) {
      return await interaction.reply({
        content: 'I must be in your voice channel to use this command',
        ephemeral: true,
      });
    }

    if (queue.node.isPlaying()) {
      return await interaction.reply({
        content: 'Song is already playing',
      });
    }

    if (!queue.node.isPaused()) {
      return await interaction.reply({
        content: 'The song is not currently paused',
      });
    }

    try {
      const track = queue.currentTrack;
      queue.node.resume();

      const embed = new EmbedBuilder()
        .setTitle('Resuming')
        .setDescription(`Resuming **${track.title}** - ${track.author} (${track.duration})`)
        .setColor(0xeef9a5);

      await interaction.reply({ embeds: [embed] });
      
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });

      console.log(error);
    }
  },
};

export default resumeCommand;
