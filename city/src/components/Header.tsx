import { Text } from "@nuttyverse/blocks";

export const Header = () => {
	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "end",
				}}
			>
				<Text
					as="h1"
					style={{
						margin: 0,
						textTransform: "lowercase",
						letterSpacing: "0.1em",
						lineHeight: "1.2em",
						color: "transparent",
						background: "linear-gradient(180deg, #000 0%, #760063 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
					wdth={50}
					weight={700}
				>
					Nuttyverse
				</Text>

				<img
					src="/nuttyversal.svg"
					alt="Nuttyverse"
					style={{
						width: "140px",
						paddingRight: "0.5em",

						// Make flush with bottom border.
						marginBottom: "-1px",
						zIndex: -1,
					}}
				/>
			</div>

			<div
				style={{
					height: "3px",
					width: "calc(100% + 32px)",
					marginLeft: "-16px",
					background: "black",
					marginBottom: "1.5em",
				}}
			/>
		</div>
	);
};
