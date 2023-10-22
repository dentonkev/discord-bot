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

client.on('ready', (bot) => {
  console.log(`${bot.user.tag} is on`);
})

client.on('messageCreate',  (msg) => {
  if (msg.author.bot) {
    return;
  }

	if (msg.content === 'yo') {
		msg.reply('S tier bro');
	} 
});

client.login(process.env.BOT_TOKEN);