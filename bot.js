import dotenv from 'dotenv'
dotenv.config()

import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log('Bot is on');
})

client.on('message', msg => {
	if (msg.content === 'hello') {
		msg.reply('stfu');
	} 
});

client.login(dotenv);