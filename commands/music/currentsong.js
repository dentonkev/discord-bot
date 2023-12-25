import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const currentsongCommand = {
  data: new SlashCommandBuilder()
    .setName('currentsong')
    .setDescription('The song that is currently playing'),

  async execute(interaction) {
    const queue = useQueue(interaction.guildId);
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    if (!queue.node.isPlaying()) {
      return await interaction.reply({
        content: 'No song is currently playing',
      });
    }

    try {
      const currTrack = queue.currentTrack;
      await interaction.reply({
        content: `**${currTrack.title}** - ${currTrack.author} (${currTrack.duration} is currently playing)`,
      });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
    }
  },
};

export default currentsongCommand;
