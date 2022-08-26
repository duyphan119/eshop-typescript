import React from "react";
import { AiOutlineDown } from "react-icons/ai";
interface Props {
	cx: Function;
	onFilter: Function;
	tags?: string;
}

interface ColorState {
	name: string;
	code: string;
}

const colors: ColorState[] = [
	{
		name: "Black",
		code: "Black",
	},
	{
		name: "White",
		code: "White",
	},
	{
		name: "Red",
		code: "Red",
	},
	{
		name: "Green",
		code: "Green",
	},
	{
		name: "Blue",
		code: "Blue",
	},
	{
		name: "Pink",
		code: "Pink",
	},
];

const sizes: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const Filter: React.FC<Props> = (props: Props) => {
	const { cx, onFilter, tags } = props;
	const array = tags?.split(",");
	return (
		<div className={cx("filter")}>
			<ul className={cx("filter-list")}>
				<li className={cx("filter-item")}>
					<div className={cx("filter-item-title")}>
						<span>Color</span>
						<span>
							<AiOutlineDown />
						</span>
					</div>
					<ul className={cx("filter-item-tags")}>
						{colors.map((color: ColorState) => {
							return (
								<li
									className={cx("filter-item-tag", {
										active: array?.find(
											(item: string) =>
												item === color.name
										),
									})}
									key={color.name}
									onClick={() => onFilter(color.name)}
								>
									<div
										className={cx(
											"filter-item-tag-color-code"
										)}
										style={{ backgroundColor: color.code }}
									></div>
									{color.name}
								</li>
							);
						})}
					</ul>
				</li>
				<li className={cx("filter-item")}>
					<div className={cx("filter-item-title")}>
						<span>Size</span>
						<span>
							<AiOutlineDown />
						</span>
					</div>
					<ul className={cx("filter-item-tags")}>
						{sizes.map((size: string) => {
							return (
								<li
									className={cx("filter-item-tag", {
										active: array?.find(
											(item: string) => item === size
										),
									})}
									key={size}
									onClick={() => onFilter(size)}
								>
									{size}
								</li>
							);
						})}
					</ul>
				</li>
			</ul>
		</div>
	);
};
export default React.memo(Filter);
