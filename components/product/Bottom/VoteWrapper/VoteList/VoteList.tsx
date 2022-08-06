// import { Vote } from "interfaces/vote";
import React from "react";
import { Vote } from "~/types/vote";
import VoteItem from "../Vote";

interface Props {
	list: Vote[];
}

const VoteList: React.FC<Props> = ({ list }: Props) => {
	return (
		<ul>
			{list.map((item: Vote) => {
				return <VoteItem key={item.id} vote={item} />;
			})}
		</ul>
	);
};

export default React.memo(VoteList);
