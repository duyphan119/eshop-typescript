import { Tabs } from "antd";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { useSelector } from "react-redux";
import { productState } from "redux/slice/product.slice";
import VoteWrapper from "./VoteWrapper";

const Bottom: React.FC = () => {
	const { productDetailPage } = useSelector(productState);

	if (!productDetailPage.item) return <></>;
	return (
		<Tabs defaultActiveKey="2">
			<Tabs.TabPane
				tab={
					<span>
						<MdDescription
							style={{
								fontSize: 16,
								transform: "translateY(2px)",
							}}
						/>
						&nbsp; Description
					</span>
				}
				key="1"
			>
				Tab 1
			</Tabs.TabPane>
			<Tabs.TabPane
				tab={
					<span>
						<AiOutlineComment
							style={{
								fontSize: 16,
								transform: "translateY(2px)",
							}}
						/>
						&nbsp; Voting
					</span>
				}
				key="2"
			>
				{productDetailPage.item.id && <VoteWrapper productId={productDetailPage.item.id} />}
			</Tabs.TabPane>
		</Tabs>
	);
};

export default Bottom;
