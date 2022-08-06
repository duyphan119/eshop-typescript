import { Tabs } from "antd";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import VoteWrapper from "./VoteWrapper";

interface Props {
	productId: number;
}

const Bottom: React.FC<Props> = ({ productId }: Props) => {
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
				{productId && <VoteWrapper productId={productId} />}
			</Tabs.TabPane>
		</Tabs>
	);
};

export default Bottom;
