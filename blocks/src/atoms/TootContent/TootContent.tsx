import { formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMastodon } from "@fortawesome/free-brands-svg-icons";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { Text } from "~/atoms/Text";
import { container, content, timestamp } from "./TootContent.css";

type TootContentProps = {
	/**
	 * Specifies the HTML content to render.
	 */
	content: string;

	/**
	 * Specifies the creation date of the toot.
	 */
	createdAt: Date;
};

export const TootContent: React.FC<TootContentProps> = (props) => {
	const timeSinceToot = formatDistance(props.createdAt, new Date(), {
		addSuffix: true,
	});

	return (
		<div className={container}>
			<div
				dangerouslySetInnerHTML={{ __html: props.content }}
				className={content}
			/>

			<Text size="smol" className={timestamp} marginless>
				posted {timeSinceToot} on{" "}
				<FontAwesomeIcon
					style={{ height: experimentalTypeScale.smol }}
					icon={faMastodon}
				/>
			</Text>
		</div>
	);
};
