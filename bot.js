import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
} from 'discord.js';
import { Player, QueryType } from 'discord-player';
import { config } from 'dotenv';
import fs, { readdirSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';

config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// Client initialization
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Load in slash commands from commands directory
const commands = [];
client.commands = new Collection();

const __dirname = dirname(fileURLToPath(import.meta.url));
const foldersPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
  if (folder === 'test') continue;

  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    if (command) {
      client.commands.set(command.default.data.name, command);
      commands.push(command.default.data.toJSON());
    }
  }
}

const rest = new REST().setToken(BOT_TOKEN);

async function slashCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    // await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
}
slashCommands();

// Player initialization
const player = new Player(client, {
  useLegacyFFmpeg: false,
  skipFFmpeg: false,
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});
await player.extractors.loadDefault();

// Client Event Handling
client.on('ready', () => {
  console.log(`${client.user.tag} is online`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command with name ${interaction.commandName}`);
      return;
    }

    try {
      await command.default.execute(interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === 'test') {
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

client.login(BOT_TOKEN);

// Player Event Handling
