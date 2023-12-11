import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  StringSelectMenuBuilder,
} from 'discord.js';
import { config } from 'dotenv';
import hydroCommand from './commands/hydro.js';
import coffeeCommand from './commands/coffee.js';
import roleCommand from './commands/role.js';
import userCommand from './commands/user.js';
import channelCommand from './commands/channel.js';
import removeCommand from './commands/kick.js';
import pingCommand from './commands/ping.js';
import echoCommand from './commands/echo.js';

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

client.commands = new Collection();
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

  if (message.content === 'hi bub') {
    message.reply('how you do that');
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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'hydro') {
    const bottle = interaction.options.getString('bottle');
    await interaction.reply({
      content: `You ordered a ${bottle}`,
      ephemeral: true,
    });
  }

  if (interaction.commandName === 'coffee') {
    const coffee = interaction.options.getString('mug');
    await interaction.reply({
      content: `You ordered a ${coffee}`,
      ephemeral: true,
    });
  }

  // if (interaction.commandName === 'ping') {
  //   await interaction.reply({ content: 'pong!' });
  //   const message = await interaction.fetchReply();
  //   console.log(message.content);
  // }

  // if (interaction.commandName === 'ping') {
  //   interaction.reply({ content: 'pong!' });
  //   setTimeout(() => {
  //     interaction.editReply({ content: 'pong edited!' });
  //   }, 2000);
  // }

  // if (interaction.commandName === 'ping') {
  //   interaction.deferReply({ ephemeral: true });
  //   setTimeout(() => {
  //     interaction.editReply({ content: 'pong after 4 seconds!' });
  //   }, 4000);
  // }

  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: 'pong!' });
    await interaction.followUp({ content: 'pong number 2' });
    await interaction.deleteReply();
  }

  if (interaction.commandName === 'echo') {
    const message = interaction.options.getString('message');
    const number = interaction.options.getNumber('number');
    if (number === undefined) {
      await interaction.reply(`${message}`);
    } else {
      await interaction.reply(`${message}, ${number}`);
    }
  }

  if (interaction.commandName === 'remove') {
    const banConfirm = new ButtonBuilder()
      .setCustomId('banConfirm')
      .setLabel('Ban')
      .setStyle(ButtonStyle.Danger)
      .setEmoji({ name: '🔨' });

    const kickConfirm = new ButtonBuilder()
      .setCustomId('kickConfirm')
      .setLabel('Kick')
      .setStyle(ButtonStyle.Danger)
      .setEmoji({ name: '🔨' });

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji({ name: '✋' });

    if (interaction.options.getSubcommand() === 'kick') {
      const user = interaction.options.getUser('user');
      const row = new ActionRowBuilder().addComponents(kickConfirm, cancel);

      interaction.reply({
        content: `Confirm ban on ${user.displayName}`,
        components: [row],
      });
      interaction.guild.members.kick(user);
    }

    if (interaction.options.getSubcommand() === 'ban') {
      const user = interaction.options.getUser('user');
      const row = new ActionRowBuilder().addComponents(banConfirm, cancel);

      interaction.reply({
        content: `Confirm ban on ${user.displayName}`,
        components: [row],
      });
      interaction.guild.members.ban(user);
    }
  }
});

async function slashCommands() {
  const commands = [
    hydroCommand,
    coffeeCommand,
    roleCommand,
    userCommand,
    channelCommand,
    removeCommand,
    pingCommand,
    echoCommand,
  ];

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
}

slashCommands();
client.login(BOT_TOKEN);
