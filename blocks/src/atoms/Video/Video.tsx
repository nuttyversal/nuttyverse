import { base } from "./Video.css";

type VideoProps = React.ComponentPropsWithoutRef<"video">;

export const Video = (props: VideoProps) => {
	return <video className={base} {...props} />;
};
