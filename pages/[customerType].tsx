import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";

interface Props {
	customerType: string;
}

const CustomerType: NextPage<Props> = ({ customerType }: Props) => {
	return <div>{customerType}</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [
			{
				params: {
					customerType: "men",
				},
			},
			{
				params: {
					customerType: "women",
				},
			},
			{
				params: {
					customerType: "kid",
				},
			},
		],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	return {
		props: {
			customerType: params.customerType,
		},
	};
};

export default CustomerType;
