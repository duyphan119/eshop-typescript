import { Avatar, Button, Col, Comment, Form, Rate, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { voteActions, voteState } from "redux/slice/vote";
import VoteList from "./VoteList";
interface Props {
	productId: number;
}

interface InitialValues {
	content: string;
}

const initialValues: InitialValues = {
	content: "",
};

const VoteWrapper: React.FC<Props> = (props: Props) => {
	const { productId } = props;
	const dispatch = useDispatch();

	const { accessToken, me } = useSelector(authState);
	const { productDetailPage } = useSelector(voteState);

	const [rate, setRate] = React.useState<number>(0);

	React.useEffect(() => {
		if (accessToken) {
			dispatch(
				voteActions.getVoteListProductDetailPageFetch({
					accessToken,
					dispatch,
					params: {
						productId,
						limit: 10,
					},
				})
			);
		}
	}, [accessToken, dispatch, productId]);

	const handleChange = (value: number) => {
		setRate(value);
	};

	const handleSubmit = (values: InitialValues) => {
		if (accessToken && me) {
			const body = {
				...values,
				rate,
				productId,
				userId: me.id,
			};
			dispatch(
				voteActions.addVoteProductDetailPageFetch({
					body,
					accessToken,
					dispatch,
				})
			);
		}
	};

	console.log(productDetailPage);

	return (
		<section>
			<Row>
				<Col xs={24} style={{ textAlign: "center" }}>
					<Rate style={{ fontSize: 26 }} onChange={handleChange} value={rate} />
				</Col>
			</Row>
			<Comment
				avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
				content={
					<Form initialValues={initialValues} onFinish={handleSubmit}>
						<Form.Item name="content">
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item>
							<Button htmlType="submit" type="primary" loading={productDetailPage.isLoading}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				}
			/>
			<h4>Voting list</h4>
			<VoteList list={productDetailPage.list} />
		</section>
	);
};

export default React.memo(VoteWrapper);
