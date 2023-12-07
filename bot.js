import { ActionRowBuilder, Client, Collection, Events, GatewayIntentBits, REST, Routes, SelectMenuBuilder, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';
import { config } from 'dotenv';
import hydroCommand from './commands/hydro.js'
import coffeeCommand from './commands/coffee.js'
import roleCommand from './commands/role.js'
import userCommand from './commands/user.js'
import channelCommand from './commands/channel.js'
import removeCommand from './commands/kick.js'

config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

client.on('ready', () => {
  console.log(`${client.user.tag} is online`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === 'yo') {
    message.reply('this actually works');
  }
});

client.on('channelCreate', (channel) => {
  // 2 is voice channel
  if (channel.type === 2) {
    console.log(`A voice channel named ${channel.name} has been created`);
  }

  // 0 is text channel
  if (channel.type === 0) {
    console.log(`A text channel named ${channel.name} has been created`);
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hydro') {
    const actionRow = new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder() 
    )

    const bottle = interaction.options.data[0].value;
    interaction.reply({ content: `You ordered a ${bottle}` });
  }

  if (interaction.isChatInputCommand() && interaction.commandName === 'coffee') {
    const coffee = interaction.options.data[0].value;
    interaction.reply({ content: `You ordered a ${coffee}` });
  }

});

async function slashCommands() {  
  // https://discord.com/developers/docs/interactions/application-commands#application-command-object
  const commands = [hydroCommand, coffeeCommand, roleCommand, userCommand, channelCommand, removeCommand];

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });
  } 
  catch (error) {
    console.log(error);
  }
}

slashCommands();
client.login(BOT_TOKEN);