import React from "react";
import { ShowChildrenType, SidebarItem } from "../Sidebar";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
interface Props {
	cx: Function;
	item: SidebarItem;
	onToggle: Function;
	isFull?: boolean;
	showChildren: ShowChildrenType;
}
const Item: React.FC<Props> = (props: Props) => {
	const { cx, item, onToggle, isFull, showChildren } = props;

	return (
		<li className={cx("menu-item")}>
			{item.children ? (
				<>
					<div
						className={cx("menu-item-link", {
							"has-children": item.children,
						})}
						onClick={() => onToggle(item.text)}
					>
						{isFull ? (
							<>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<span className={cx("menu-item-link-icon")}>
										{item.icon}
									</span>
									<span className={cx("menu-item-link-text")}>
										{item.text}
									</span>
								</div>
								<div>
									{showChildren &&
									showChildren.text === item.text &&
									showChildren.isShow ? (
										<AiOutlineUp />
									) : (
										<AiOutlineDown />
									)}
								</div>
							</>
						) : (
							<Tooltip placement="right" title={item.text}>
								<span className={cx("menu-item-link-icon")}>
									{item.icon}
								</span>
							</Tooltip>
						)}
					</div>
					{showChildren &&
						showChildren.text === item.text &&
						showChildren.isShow && (
							<div className={cx("children")}>
								{item.children?.map(
									(element: SidebarItem, index1: number) => (
										<Link
											to={element.path}
											key={index1}
											className={`${cx("child")} ${
												element.isActive
													? cx("active")
													: ""
											}`}
										>
											{isFull ? (
												<>
													<span
														className={cx(
															"child-icon"
														)}
													>
														{element.icon}
													</span>
													<span
														className={cx(
															"child-text"
														)}
													>
														{element.text}
													</span>
												</>
											) : (
												<Tooltip
													placement="right"
													title={element.text}
												>
													<span
														className={cx(
															"child-icon"
														)}
													>
														{element.icon}
													</span>
												</Tooltip>
											)}
										</Link>
									)
								)}
							</div>
						)}
				</>
			) : (
				<Link
					to={item.path}
					className={`${cx("menu-item-link")} ${
						item.isActive ? cx("active") : ""
					}`}
				>
					{isFull ? (
						<>
							<span className={cx("menu-item-link-icon")}>
								{item.icon}
							</span>
							<span className={cx("menu-item-link-text")}>
								{item.text}
							</span>
						</>
					) : (
						<Tooltip placement="right" title={item.text}>
							<span className={cx("menu-item-link-icon")}>
								{item.icon}
							</span>
						</Tooltip>
					)}
				</Link>
			)}
		</li>
	);
};
export default React.memo(Item);
