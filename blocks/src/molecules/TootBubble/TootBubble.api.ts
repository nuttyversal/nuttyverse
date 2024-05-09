export type Toot = {
	/**
	 * Direct link to toot.
	 */
	url: string;

	/**
	 * HTML content of toot.
	 */
	content: string;

	/**
	 * Creation timestamp of toot.
	 */
	created_at: string;
};

export const fetchToots = async (): Promise<Toot[]> => {
	const nuttyId = "112402226484864747";
	const tootsApiEndpoint = `https://toots.nuttyver.se/api/v1/accounts/${nuttyId}/statuses`;
	return fetch(tootsApiEndpoint).then((response) => response.json());
};
