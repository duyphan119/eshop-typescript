import React, { CSSProperties } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import { UseFormRegister } from "react-hook-form";

interface Props {
	label?: string;
	style?: CSSProperties;
	name?: string;
	validation?: any;
	register?: UseFormRegister<any>;
	errors?: any;
}
const cx = classNames.bind(styles);
const Input: React.FC<Props> = ({ label, style, name, validation, register, errors }: Props) => {
	const id = React.useId();

	return (
		<>
			<label htmlFor={id} className={cx("form-control")} style={style}>
				<label htmlFor={id}>{label}</label>
				<input {...(register ? register(name || "", validation || {}) : {})} id={id} />
			</label>
			{/* {errors[name || id] && <span>{errors[name || id]?.message?.toString()}</span>} */}
		</>
	);
};
export default Input;
