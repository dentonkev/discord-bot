import dotenv from 'dotenv'
dotenv.config()

import { Client, IntentsBitField } from 'discord.js';

const client = new Client({ intents: [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
],
});

client.on('ready', () => {
  console.log('Bot is on');
})

client.on('messageCreate',  (msg) => {
	if (msg.content === 'hello') {
		msg.reply('hey');
	} 
});

client.login(process.env.BOT_TOKEN);