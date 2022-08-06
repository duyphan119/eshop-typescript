import { Avatar, Comment, Rate, Space } from "antd";
// import { Vote } from "interfaces/vote";
import React from "react";
import { fromNow } from "utils";
import { Vote } from "~/types/vote";
interface Props {
	children?: React.ReactNode;
	vote: Vote;
}
const VoteItem: React.FC<Props> = ({ children, vote }: Props) => {
	return (
		<Comment
			actions={[<span key="comment-nested-reply-to">Reply to</span>]}
			author={
				<Space>
					<span>{vote.user?.fullName}</span>
					<Rate
						disabled
						value={vote.rate}
						style={{ fontSize: 12, transform: "translateY(-1px)" }}
					/>
					<span>{vote.createdAt && fromNow(vote.createdAt)}</span>
				</Space>
			}
			avatar={
				<Avatar
					src={"https://joeschmoe.io/api/v1/random"}
					alt="Han Solo"
				/>
			}
			content={<p>{vote.content}</p>}
		>
			{children}
		</Comment>
	);
};

export default React.memo(VoteItem);
