import { useQuery } from "@tanstack/react-query";

type Toot = {
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

const getLatestToot = async (): Promise<Toot[]> => {
	const nuttyId = "112402226484864747";
	const tootsApiEndpoint = `https://toots.nuttyver.se/api/v1/accounts/${nuttyId}/statuses`;
	const response = await fetch(tootsApiEndpoint);

	return response.json();
};

export const useLatestToot = () => {
	const query = useQuery<Toot[]>({
		queryKey: ["latestToot"],
		queryFn: getLatestToot,
	});

	return {
		query,
	};
};
