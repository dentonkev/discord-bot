import { useHistory, useMainPlayer } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';

const previousCommand = {
  data: new SlashCommandBuilder()
    .setName('previous')
    .setDescription('Enqueue the previous song'),

  async execute(interaction) {
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return await interaction.reply({
        content: 'You must be in a voice channel to use this command',
        ephemeral: true,
      });
    }

    try {
      const history = useHistory(interaction.guildId);
      const prev = history.previousTrack;

      if (!prev) {
        return await interaction.reply({
          content: 'There is no previous track',
        });
      }

      player.play(channel, prev, {
        nodeOptions: {
          metadata: {
            channel: interaction.channel,
            client: interaction.guild.members.me,
            requestedBy: interaction.user,
          },
          bufferingTimeout: 15000,
          leaveOnStop: true,
          leaveOnStopCooldown: 5000,
          leaveOnEnd: true,
          leaveOnEndCooldown: 15000,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          skipOnNoStream: true,
        },
      });

      await interaction.reply({
        content: `${prev.title} has been succesfully enqueued`,
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
