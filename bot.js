import fs  from 'fs';
import path from 'path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();

const cwd = '/Users/dentonkev/Documents/Programming/projects/discord-bot';

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
],
});

// client.commands = new Collection();

// const commandPath = path.join(cwd, 'commands');
// // console.log(commandPath);
// const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));
// // console.log(commandFiles);

// for (const file of commandFiles) {
//   const filePath = path.join(commandPath, file);
//   // console.log(filePath);
//   // TODO: Change line below
//   const command = require(filePath);
//   console.log(command);

//   if ('data' in command && 'execute' in command) {
//     client.commands.set(command.data.name, command);
//   } 
// } 

// client.on(Events.InteractionCreate, async interaction => {
//   if (!interaction.isChatInputCommand()) return;
//   console.log(interaction);
  
//   const command = interaction.client.commands.get(interaction.commandName);

//   if (!command) {
//     console.error(`${interaction.commandName} not found`);
//   }

//   try {
//     await command.execute(interaction);
//   } catch (Error) {
//     console.error(Error);
//     if (interaction.replied || interaction) {

//     }
//   }
// });

client.on('ready', () => {
  console.log(`${client.user.tag} is online`);
});

client.on('messageCreate',  (message) => {
  if (message.author.bot) {
    return;
  }

	if (message.content === 'yo') {
		message.reply('S tier bro');
	} 

  console.log(message.content);
});

client.on('channelCreate', (channel) => {
  if (channel.type === 2) {
    const type = 'voice chat';
    console.log(`A ${type} named ${channel.name} has been created`);
  }

});

client.login(process.env.BOT_TOKEN);