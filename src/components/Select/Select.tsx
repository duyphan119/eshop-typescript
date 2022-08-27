import React, { CSSProperties } from "react";
import styles from "./Select.module.scss";
import classNames from "classnames/bind";
type Option = {
	text?: any;
	value: any;
};
interface Props {
	label?: string;
	options?: Array<Option>;
	style?: CSSProperties;
	text?: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	name?: string;
	validation?: any;
	register?: any;
	errors?: any;
}
const cx = classNames.bind(styles);
const Select: React.FC<Props> = ({ label, options, style, text, onChange, name, register, errors, validation }: Props) => {
	const id = React.useId();
	return (
		<>
			<label htmlFor={id} className={cx("form-control")} style={style}>
				<label htmlFor={id}>{label}</label>
				<select {...(register ? register(name || "", validation || {}) : {})} id={id} onChange={onChange}>
					{text && <option value="">{text}</option>}
					{options?.map((item: Option) => {
						return (
							<option value={item.value} key={item.value}>
								{item.text || item.value}
							</option>
						);
					})}
				</select>
			</label>
			{/* {errors[name || id] && <span>{errors[name || id]?.message?.toString()}</span>} */}
		</>
	);
};
export default Select;
