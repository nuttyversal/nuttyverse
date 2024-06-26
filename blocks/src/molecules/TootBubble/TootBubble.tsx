import { CSSProperties } from "react";
import { TootContainer } from "~/atoms/TootContainer";
import { TootContent } from "~/atoms/TootContent";
import { Toot, fetchToots } from "./TootBubble.api";
import { container, link } from "./TootBubble.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

type TootBubbleProps = {
	/**
	 * Additional class names to apply to the toot bubble.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the toot bubble.
	 */
	style?: CSSProperties;
};

export const TootBubble: React.FC<TootBubbleProps> = (props) => {
	const [latestToot, setLatestToot] = useState<Toot | null>(null);
	const [hasEncounteredError, setHasEncounteredError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const [latestToot] = await fetchToots();
				setLatestToot(latestToot);
			} catch (error) {
				setHasEncounteredError(true);
			}
		})();
	}, []);

	if (hasEncounteredError) {
		return <TootContainer>Uh oh... something went wrong.</TootContainer>;
	}

	if (latestToot === null) {
		return <TootContainer>Loading...</TootContainer>;
	}

	const html = latestToot.content;
	const href = latestToot.url;
	const createdAt = new Date(latestToot.created_at);

	return (
		<a
			className={classNames([link, props.className])}
			style={props.style}
			href={href}
			target="_blank"
		>
			<TootContainer className={container}>
				<TootContent html={html} createdAt={createdAt} />
			</TootContainer>
		</a>
	);
};
