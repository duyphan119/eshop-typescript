import React from "react";
import styles from "./Container.module.scss";

interface Props {
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const Container: React.FC<Props> = ({ children, style }: Props) => {
	return (
		<div className={styles.container} style={style}>
			{children}
		</div>
	);
};

export default Container;
