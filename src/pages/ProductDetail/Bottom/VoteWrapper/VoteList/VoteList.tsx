import { Vote } from "interfaces/vote";
import React from "react";
import VoteItem from "../Vote";

interface Props {
	list: Vote[];
}

const VoteList: React.FC<Props> = (props: Props) => {
	const { list } = props;

	return (
		<ul>
			{list.map((item: Vote, index: number) => {
				return <VoteItem key={item.id} vote={item} />;
			})}
		</ul>
	);
};

export default React.memo(VoteList);
