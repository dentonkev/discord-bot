import { useHistory, useMainPlayer } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const previousCommand = {
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Immediately play the previous song'),

  async execute(interaction) {
    const player = useMainPlayer();
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

    try {
      const history = useHistory(interaction.guildId);

      if (!history) {
        return await interaction.reply({
          content: 'There is no previous track',
        });
      }

      const prev = history.previousTrack;

      if (!prev) {
        return await interaction.reply({
          content: 'There is no previous track',
        });
      }

      history.previous();

      await interaction.reply({
        content: `Now playing **${prev.title}** - ${prev.author} (${prev.duration})`,
      });
    } catch (error) {
      await interaction.reply({
        content: 'An error has occured during execution',
      });
      console.log(error);
    }
  },
};

export default previousCommand;
