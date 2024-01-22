import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import { channelIdByName, userIdByName } from './constants.js';

async function start() {
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

	client.on(Events.MessageCreate, (message) => {
		// Ignore messages from bots.
		if (message.author.bot) return;

		// Only reply to messages in #linkshell.
		if (message.channelId !== channelIdByName.linkshell) return;

		if (message.mentions.has(userIdByName.nuttybot)) {
			if (message.author.id === userIdByName.nuttyversal) {
				message.channel.send('Hello! ٩(◕‿◕｡)۶');
			} else if (message.author.id === userIdByName.PrinceWalnut) {
				message.channel.send('Fuck you! (¬_¬")');
			} else {
				message.channel.send('Hiya! (⸝⸝ᵕᴗᵕ⸝⸝)');
			}
		}
	});

	await client.login(process.env.DISCORD_BOT_TOKEN);

	// Send a message to #bot-testing to confirm that the bot is running.
	const channel = await client.channels.fetch(channelIdByName.botTesting) as TextChannel;
	channel?.send('I am alive!');
}

dotenv.config();
start();
