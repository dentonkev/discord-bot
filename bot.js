import { fs } from 'fs';
import { path } from 'path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
],
});

client.commands = new Collection();

const commandPath = path.join(__dirname, 'commands');
// console.log(commandPath);
const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.cjs'));
// console.log(commandFiles);

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  // console.log(filePath);
  // TODO: Change line below
  const command = require(filePath);
  console.log(command);

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } 
} 

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`${interaction.commandName} not found`);
  }

  try {
    await command.execute(interaction);
  } catch (Error) {
    console.error(Error);
    if (interaction.replied || interaction) {

    }
  }
});

client.once(Events.ClientReady, bot => {
  console.log(`${bot.user.tag} is online`)
});

client.on('messageCreate',  (msg) => {
  if (msg.author.bot) {
    return;
  }

	if (msg.content === 'yo') {
		msg.reply('S tier bro');
	} 

  console.log(msg.content);
});

client.login(process.env.BOT_TOKEN);