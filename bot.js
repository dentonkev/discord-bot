import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Collection,
  ComponentType,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import { config } from 'dotenv';
import hydroCommand from './commands/hydro.js';
import drinkCommand from './commands/drinks.js';
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
  if (interaction.isChatInputCommand()) {
    // ! hydro
    if (interaction.commandName === 'hydro') {
      const bottle = interaction.options.getString('bottle');
      await interaction.reply({
        content: `You ordered a ${bottle}`,
        ephemeral: true,
      });
    }
    // ! drink
    if (interaction.commandName === 'drink') {
      const menu = new StringSelectMenuBuilder()
        .setCustomId('drink-choice')
        .setPlaceholder('Choose your favourite drinks')
        .setMaxValues(1)
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel('Coffee')
            .setValue('coffee')
            .setEmoji({ name: '☕' }),

          new StringSelectMenuOptionBuilder()
            .setLabel('Coke')
            .setValue('coke')
            .setEmoji({ name: '🥤' }),

          new StringSelectMenuOptionBuilder()
            .setLabel('Bubble tea')
            .setValue('bubble-tea')
            .setEmoji({ name: '🧋' }),

          new StringSelectMenuOptionBuilder()
            .setLabel('Sugar Cane')
            .setValue('sugar-cane')
            .setEmoji({ name: '🍹' })
        );

      const row = new ActionRowBuilder().addComponents(menu);
      const response = await interaction.reply({ components: [row] });

      // returns an InteractionCollector
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === interaction.user.id,
        time: 60000,
      });

      collector.on('collect', async (i) => {
        const selection = i.values;
        await i.reply(`${i.user} chose ${selection}`);
      });
    }

    // ! remove
    if (interaction.commandName === 'remove') {
      const banConfirm = new ButtonBuilder()
        .setCustomId('ban')
        .setLabel('Ban')
        .setStyle(ButtonStyle.Danger)
        .setEmoji({ name: '🔨' });

      const kickConfirm = new ButtonBuilder()
        .setCustomId('kick')
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

        const response = await interaction.reply({
          content: `Confirm kick on ${user.displayName}`,
          components: [row],
        });

        try {
          const confirmation = await response.awaitMessageComponent({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60000,
          });

          if (confirmation.customId === 'kick') {
            await interaction.guild.members.kick(user);
            await confirmation.update({
              content: `${user} has been kicked`,
              components: [],
            });
          } else if (confirmation.customId === 'cancel') {
            await confirmation.update({
              content: `Kick command cancelled`,
              components: [],
            });
          }
        } catch (error) {
          await interaction.editReply({
            content: 'No confirmation receieved for 1 min',
            components: [],
          });
        }
      }

      if (interaction.options.getSubcommand() === 'ban') {
        const user = interaction.options.getUser('user');
        const row = new ActionRowBuilder().addComponents(banConfirm, cancel);

        const response = await interaction.reply({
          content: `Confirm ban on ${user.displayName}`,
          components: [row],
        });

        try {
          const confirmation = await response.awaitMessageComponent({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60000,
          });

          if (confirmation.customId === 'ban') {
            interaction.guild.members.ban(user);
            await confirmation.update({
              content: `${user} has been banned`,
              components: [],
            });
          } else if (confirmation.customId === 'cancel') {
            await confirmation.update({
              content: `Ban command cancelled`,
              components: [],
            });
          }
        } catch (error) {
          await interaction.editReply({
            content: 'No confirmation receieved for 1 min',
            components: [],
          });
        }
      }
    }

    // ! ping
    if (interaction.commandName === 'ping') {
      await interaction.reply({ content: 'pong!' });
      await interaction.followUp({ content: 'pong number 2' });
      await interaction.deleteReply();
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

    // ! echo
    if (interaction.commandName === 'echo') {
      const message = interaction.options.getString('message');
      const number = interaction.options.getNumber('number');
      if (number === undefined) {
        await interaction.reply(`${message}`);
      } else {
        await interaction.reply(`${message}, ${number}`);
      }
    }
  }
});

async function slashCommands() {
  const commands = [
    hydroCommand,
    drinkCommand,
    roleCommand,
    userCommand,
    channelCommand,
    removeCommand,
    pingCommand,
    echoCommand,
  ];

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
}

slashCommands();
client.login(BOT_TOKEN);
