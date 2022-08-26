import { Dropdown, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
interface Props {
	sortBy?: string;
	sortType?: string;
	cx: Function;
	onSort: Function;
}

interface MenuItem {
	key: string;
	label: string;
}

const items: MenuItem[] = [
	{
		key: "",
		label: "Newest",
	},
	{
		key: "name_asc",
		label: "Name (A - Z)",
	},
	{
		key: "name_desc",
		label: "Name (Z - A)",
	},
	{
		key: "price_asc",
		label: "Price (A - Z)",
	},
	{
		key: "price_desc",
		label: "Price (Z - A)",
	},
];
const Sort: React.FC<Props> = (props: Props) => {
	const { sortBy, sortType, cx, onSort } = props;
	return (
		<div className={cx("sort")}>
			<span>Sort by</span>
			<Dropdown
				overlay={() => {
					return (
						<Menu
							selectable
							defaultSelectedKeys={[
								`${sortBy || ""}${
									sortBy && sortType ? "_" : ""
								}${sortType || ""}`,
							]}
							items={items.map(
								(item: MenuItem) =>
									({
										...item,
										onClick: () => onSort(item.key),
									} as ItemType)
							)}
						/>
					);
				}}
			>
				<div className={cx("sort-result")}>
					<span className={cx("text")}>
						{items.find(
							(item: any) => item.key === `${sortBy}_${sortType}`
						)?.label || items[0].label}
					</span>
					<span className={cx("icon")}>
						<AiOutlineDown />
					</span>
				</div>
			</Dropdown>
		</div>
	);
};
export default React.memo(Sort);
