import { container, marquee, marqueeShadowClone, overlay } from "./Marquee.css";

type Props = {
	children: React.ReactNode;
};

export const Marquee = (props: Props) => {
	return (
		<div className={container}>
			{/* Kage Bunshin no Jutsu */}
			<div className={marquee}>{props.children}</div>
			<div className={marqueeShadowClone}>{props.children}</div>

			{/* Fade content in and out. */}
			<div className={overlay} />
		</div>
	);
};
