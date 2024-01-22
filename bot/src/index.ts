import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { channelIdByName } from './constants.js';

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once(Events.ClientReady, (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}.`);
});

client.on(Events.MessageCreate, (message) => {
	// Ignore messages from bots.
	if (message.author.bot) return;

	// Only reply to messages in #bot-testing.
	if (message.channelId !== channelIdByName.botTesting) return;

	// Reply to the message with the same content.
	message.channel.send(message.content);
});

client.login(process.env.DISCORD_BOT_TOKEN);
