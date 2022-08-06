import { Affix } from "antd";
import React from "react";
import Layout from "~/components/Layout";
import Header from "./Header";

interface Props {
	children: React.ReactNode;
}

const Default: React.FC<Props> = ({ children }: Props) => {
	return (
		<Layout>
			<div>
				<Affix offsetTop={1}>
					<Header />
				</Affix>
				{children}
			</div>
		</Layout>
	);
};

export default Default;
