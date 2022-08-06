import { GetStaticProps, NextPage } from "next";
import * as postApi from "~/api/postApi";
import Container from "~/components/Container";
import useTitle from "~/hooks/useTitle";
import { Post } from "~/types/post";
import { DefaultLayout } from "~/layouts";

interface Props {
	post: Post;
}

const PostDetail: NextPage<Props> = ({ post }: Props) => {
	useTitle(post.title);
	return (
		<DefaultLayout>
			<Container>
				<h1>{post.title}</h1>
				<span>{post.user?.fullName}</span>
				<p dangerouslySetInnerHTML={{ __html: post.content }}></p>
			</Container>
		</DefaultLayout>
	);
};
export async function getStaticPaths() {
	const res = await postApi.getAllPosts({});
	return {
		paths: res.data.items.map((item: Post) => ({
			params: { id: item.id },
		})),
		fallback: true,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const res = await postApi.getPostById(params.id);
	return {
		props: {
			post: res.data,
		},
	};
};

export default PostDetail;
