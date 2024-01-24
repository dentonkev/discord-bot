import { useQueue } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

const removeCommand = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a song from the queue')
    .addNumberOption((option) => 
      option
        .setName('position')
        .setDescription('The position of the song in queue that you want to remove')
        .setRequired(true)
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

    if (!clientChannel) {
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
        content: `${position} is not a valid position in the queue`
      })
    }

    try {
      queue.removeTrack(positionIndex);
      console.log(queue.tracks);

    } catch (error) {

    }

  }
}

export default removeCommand;