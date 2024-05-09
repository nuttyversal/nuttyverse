import classNames from "classnames";
import { formatDistance } from "date-fns";
import { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMastodon } from "@fortawesome/free-brands-svg-icons";
import { experimentalTypeScale } from "~/styles/tokens/typography";
import { Text } from "~/atoms/Text";
import { container, content, timestamp } from "./TootContent.css";

type TootContentProps = {
	/**
	 * Specifies the HTML content to render.
	 */
	html: string;

	/**
	 * Specifies the creation date of the toot.
	 */
	createdAt: Date;

	/**
	 * Additional class names to apply to the toot container.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the toot container.
	 */
	style?: CSSProperties;
};

export const TootContent: React.FC<TootContentProps> = (props) => {
	const timeSinceToot = formatDistance(props.createdAt, new Date(), {
		addSuffix: true,
	});

	return (
		<div
			className={classNames([container, props.className])}
			style={props.style}
		>
			<div
				dangerouslySetInnerHTML={{ __html: props.html }}
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
