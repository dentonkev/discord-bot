import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';

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
  if (interaction.isChatInputCommand() && interaction.commandName === 'hydro') {

    const bottle = interaction.options.data[0].value;
    interaction.reply({ content: `You ordered a ${bottle}` });
  }

});

async function slashCommands() {
  const commands = [
    {
      name: 'hydro',
      description: 'Which bottle do you want to choose',
      options: [
        {
          name: 'small-bottle',
          description: 'small hydroflask bottle',
          type: 3,
          choices: [
            {
              name: 'Black-bottle',
              value: 'small-black-bottle',
            },
            {
              name: 'Blue-bottle',
              value: 'small-blue-bottle',
            },
          ]
        },
        {
          name: 'large-bottle',
          description: 'large hydroflask bottle',
          type: 3,
          choices: [
            {
              name: 'Black-bottle',
              value: 'large-black-bottle',
            },
            {
              name: 'Blue-bottle',
              value: 'large-blue-bottle',
            },
          ]
        }
      ]
    },
    {
      name: 'denton',
      description: 'caitlin',
    },
  ];

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    client.login(BOT_TOKEN);
  }
  catch (error) {
    console.log(error);
  }
}

slashCommands();
