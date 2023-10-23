const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const { Client, Collection, Events, GatewayIntentBits, IntentsBitField } = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent,
],
});

client.commands = new Collection();

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
});

client.login(process.env.BOT_TOKEN);