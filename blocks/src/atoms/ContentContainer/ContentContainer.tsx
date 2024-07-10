import { ReactNode } from "react";
import { container } from "./ContentContainer.css";

type ContentContainerProps = {
	children: ReactNode;
};

export const ContentContainer: React.FC<ContentContainerProps> = (props) => {
	return <div className={container}>{props.children}</div>;
};
