import React from "react";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";

interface Props {
	label?: string;
}
const cx = classNames.bind(styles);
const Input: React.FC<Props> = ({ label }: Props) => {
	const id = React.useId();
	return (
		<label htmlFor={id} className={cx("form-control")}>
			<span>{label}</span>
			<input id={id} />
		</label>
	);
};
export default Input;
