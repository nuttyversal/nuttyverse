import {
	Client,
	Events,
	GatewayIntentBits,
	TextChannel,
	bold,
	codeBlock,
	hideLinkEmbed,
	hyperlink,
} from "discord.js";
import dotenv from "dotenv";
import express from "express";
import redis from "redis";
import { PUBSUB_CHANNELS, channelIdByName, userIdByName } from "./constants.js";
import { GiteaWebhookCommit, RedisGitCommit } from "./models.js";

async function setupRedisClient() {
	const client = redis.createClient({
		socket: {
			host: process.env.REDIS_HOST ?? "localhost",
			port: Number(process.env.REDIS_PORT) || 6379,
		},
	});

	try {
		await client.connect();
		await client.auth({ password: process.env.REDIS_PASSWORD ?? "" });
	} catch (err) {
		console.error(err);
	}

	return client;
}

async function setupDiscordClient(
	redisClient: Awaited<ReturnType<typeof setupRedisClient>>,
) {
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
				message.channel.send("Hello! ٩(◕‿◕｡)۶");
			} else if (message.author.id === userIdByName.PrinceWalnut) {
				message.channel.send('Fuck you! (¬_¬")');
			} else {
				message.channel.send("Hiya! (⸝⸝ᵕᴗᵕ⸝⸝)");
			}
		}
	});

	await client.login(process.env.DISCORD_BOT_TOKEN);

	// Send a message to #bot-testing to confirm that the bot is running.
	const channel = (await client.channels.fetch(
		channelIdByName.botTesting,
	)) as TextChannel | null;

	channel?.send("I am alive!");

	redisClient.subscribe(PUBSUB_CHANNELS.GIT_COMMIT, async (message) => {
		const commit = JSON.parse(message) as RedisGitCommit;
		const title = bold(commit.message);
		const description = codeBlock(commit.description);
		const maskedLink = hideLinkEmbed(commit.commitUrl);
		const commitLink = hyperlink(commit.shortHash, maskedLink);

		const formattedMessage = [
			`✦ ${commitLink} • ${title}`,
			commit.description ? description : null,
		]
			.filter((part) => part !== null)
			.join("\n");

		const devlogChannel = (await client.channels.fetch(
			channelIdByName.devlog,
		)) as TextChannel | null;

		devlogChannel?.send(formattedMessage);
	});
}

function setupWebServer(
	redisClient: Awaited<ReturnType<typeof setupRedisClient>>,
) {
	const httpPort = Number(process.env.PORT) || 3000;
	const app = express();
	app.use(express.json());

	app.get("/", (_, res) => {
		res.send("Hello from Nutty Bot!");
	});

	// [DEBUG] Cache the most recent webhook call, and return it from
	// the debug endpoint to enable inspection of the JSON body.
	let cachedWebhookRequest: object | undefined = undefined;
	const cachedRedisMessages: RedisGitCommit[] = [];

	app.get("/webhooks/gitea/debug", (_, res) => {
		if (cachedWebhookRequest) {
			res.json({
				cachedWebhookRequest,
				cachedRedisMessages,
			});
		} else {
			res.json({
				cachedResponse: null,
				cachedRedisMessages,
			});
		}
	});

	app.post("/webhooks/gitea", (req, res) => {
		const commits: GiteaWebhookCommit[] = req.body.commits;

		// Cache webhook request payload for debugging purposes.
		cachedWebhookRequest = req.body;

		// Sort the commits by timestamp in chronological order.
		commits.sort((a, b) => {
			const at = new Date(a.timestamp);
			const bt = new Date(b.timestamp);
			return at.getTime() - bt.getTime();
		});

		// Parse the commits from the webhook payload.
		const parsedCommits: RedisGitCommit[] = commits.map(
			(commit: GiteaWebhookCommit) => {
				const [messageHead, ...messageTail] = commit.message.split("\n\n");
				return {
					commitUrl: commit.url,
					message: messageHead.trim(),
					description: messageTail.join("\n\n").trim(),
					shortHash: commit.id.slice(0, 7),
				};
			},
		);

		// Publish messages to the Redis pub/sub channel.
		for (const commit of parsedCommits) {
			redisClient.publish(
				PUBSUB_CHANNELS.GIT_COMMIT,
				JSON.stringify(commit),
			);
			cachedRedisMessages.push(commit);
		}

		res.send("Hello from Nutty Bot!");
	});

	app.listen(httpPort, () => {
		console.log(`Nutty Bot is listening on port ${httpPort}...`);
	});
}

dotenv.config();

(async () => {
	const redisSubscriberClient = await setupRedisClient();
	const redisPublisherClient = await setupRedisClient();
	await setupDiscordClient(redisSubscriberClient);
	setupWebServer(redisPublisherClient);
})();

process.on("SIGTERM", () => {
	console.log("Committing sudoku... 🗡️");
	process.exit(0);
});

process.on("SIGINT", () => {
	console.log("Committing sudoku... 🗡️");
	process.exit(0);
});
