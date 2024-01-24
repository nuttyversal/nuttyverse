import { Client, Events, GatewayIntentBits, TextChannel, bold, codeBlock, hideLinkEmbed, hyperlink } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import { HTTP_PORT, channelIdByName, userIdByName } from './constants.js';

async function setupDiscordClient() {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
		],
	});

	client.once(Events.ClientReady, (client) => {
		console.log(`Nutty Bot is logged in as ${client.user.tag}...`);
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

	// Preview test formatting.
	const message = bold('Push test commit');
	const description = codeBlock('A test description.\n\nfoo. bar. baz.');
	const maskedLink = hideLinkEmbed('https://code.nuttyver.se/observable/nuttyverse/commit/9bf645541e8af6f1120a130f44c7c4e8a16cdf81');
	const commitLink = hyperlink('9bf6455', maskedLink);
	const formattedMessage = `✦ ${commitLink} · ${message}\n${description}`;
	channel?.send(formattedMessage);
}

function setupWebServer() {
	const app = express();

	app.use(express.json());

	app.get('/', (_, res) => {
		res.send('Hello from Nutty Bot!');
	});

	// [DEBUG] Cache the most recent webhook call, and return it from
	// the debug endpoint to enable inspection of the JSON body.
	let cachedResponse: object | undefined = undefined;
	const cachedCommits: string[] = [];

	app.get('/webhooks/gitea/debug', (_, res) => {
		if (cachedResponse) {
			res.json({
				cachedResponse,
				cachedCommits,
			});
		} else {
			res.json({
				cachedResponse: null,
				cachedCommits,
			});
		}
	});

	app.post('/webhooks/gitea', (req, res) => {
		// Cache response for debugging purposes.
		cachedResponse = req.body;

		type Commit = {
			id: string;
			message: string;
			url: string;
		};

		const commits = req.body.commits.map((commit: Commit) => {
			const [messageHead, ...messageTail] = commit.message.split('\n\n');
			const message = messageHead.trim();
			const description = messageTail.join('\n\n').trim();
			const shortHash = commit.id.slice(0, 7);

			return {
				commitUrl: commit.url,
				message,
				description,
				shortHash,
			};
		});

		for (const commit of commits) {
			console.log(`${commit.shortHash} ${commit.message} (${commit.commitUrl})`);
			cachedCommits.push(commit);
		}

		res.send('Hello from Nutty Bot!');
	});

	app.listen(HTTP_PORT, () => {
		console.log(`Nutty Bot is listening on port ${HTTP_PORT}...`);
	});
}

dotenv.config();

setupDiscordClient();
setupWebServer();

process.on('SIGTERM', () => {
	console.log('Committing sudoku... 🗡️');
	process.exit(0);
});

process.on('SIGINT', () => {
	console.log('Committing sudoku... 🗡️');
	process.exit(0);
});
