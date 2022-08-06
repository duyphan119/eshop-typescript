import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "~/types/post";
interface Props {
	post: Post;
}
const Post: React.FC<Props> = ({ post }: Props) => {
	return (
		<Link href={`/post/${post.id}`}>
			<a
				style={{
					height: 140,
					overflow: "hidden",
					display: "flex",
					padding: 8,
					boxShadow: "0 0 2px 0 #333",
					color: "#000",
				}}
			>
				<div style={{ width: 200, height: 124 }}>
					<Image
						loader={() => {
							return `http://localhost:8080/${post.thumbnail}`;
						}}
						src="me.png"
						alt="Picture of the author"
						width={200}
						height={124}
						objectFit="cover"
					/>
				</div>
				<Space direction="vertical" style={{ marginLeft: 8 }}>
					<div style={{ fontSize: 20, fontWeight: 600 }}>
						{post.title}
					</div>
					<div
						style={{
							fontSize: 12,
							fontWeight: "thin",
							color: "gray",
						}}
					>
						{post.createdAt &&
							new Date(post.createdAt).toLocaleDateString(
								"vi-VN"
							)}
					</div>
					<div>{post.content}</div>
				</Space>
			</a>
		</Link>
	);
};

export default Post;
