import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

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

    if (!clientChannel) {
      return await interaction.reply({
        content: 'I must be in your voice channel to use this command',
        ephemeral: true,
      });
    }

    const queueArray = queue.tracks.toArray();
  },
};

export default viewQueueCommand;
