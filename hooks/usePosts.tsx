import { useEffect, useState } from "react";
import { QueryParams } from "~/types/common";
import { Post } from "~/types/post";
import * as postApi from "~/api/postApi";

function usePosts(params?: QueryParams) {
	const [list, setList] = useState<Post[]>([]);

	useEffect(() => {
		postApi.getAllPosts(params).then((res) => {
			setList(res.data.items);
		});
	}, [params]);
	return list;
}

export default usePosts;
