import { SlashCommandBuilder } from "discord.js";

const positionCommand = {
  data: new SlashCommandBuilder()
    .setName('position')
    .setDescription('Get the name of the song for the specified position in queue')
    // .addNumberOption((option) => {

    // }),
}

export default positionCommand;