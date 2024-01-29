/**
 * The git commit metadata in the webhook payload that is sent by Gitea.
 * https://code.nuttyver.se/observable/nuttyverse/settings/hooks
 */
export type GiteaWebhookCommit = {
	id: string;
	message: string;
	url: string;
	timestamp: string;
};

/**
 * The git commit metadata that is sent to the Redis pub/sub channel.
 */
export type RedisGitCommit = {
	commitUrl: string;
	message: string;
	description: string;
	shortHash: string;
};
