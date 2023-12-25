import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const restartCommand = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Restart the current song'),

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

    if (!queue.node.isPlaying()) {
      return await interaction.reply({
        content: 'No song is currently playing',
      });
    }

    try {
      const track = queue.currentTrack;

      queue.insertTrack(track, 0);
      queue.node.skip();

      queue.node.resume();
      await interaction.reply({
        content: `Restarting **${track.title}** - ${track.author} (${track.duration})`,
      });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default restartCommand;
