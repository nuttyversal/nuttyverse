import { TootContainer } from "~/atoms/TootContainer";
import { TootContent } from "~/atoms/TootContent";
import { useLatestToot } from "./TootBubble.api";
import { container } from "./TootBubble.css";

export const TootBubble: React.FC = () => {
	const { query } = useLatestToot();

	const [latestToot] = query.data ?? [];

	if (query.isLoading) {
		return <TootContainer>Loading...</TootContainer>;
	}

	if (query.isError) {
		return <TootContainer>Uh oh... something went wrong.</TootContainer>;
	}

	if (query.data) {
		const content = latestToot.content;
		const createdAt = new Date(latestToot.created_at);

		return (
			<TootContainer className={container}>
				<TootContent content={content} createdAt={createdAt} />
			</TootContainer>
		);
	}
};
