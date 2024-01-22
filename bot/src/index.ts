import { Client, Events } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
	intents: [],
});

client.once(Events.ClientReady, (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}.`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
