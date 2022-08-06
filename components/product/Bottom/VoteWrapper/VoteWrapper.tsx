import { Avatar, Button, Col, Comment, Form, Rate, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteActions, voteState } from "~/redux/slices/voteSlice";
import { getToken } from "~/utils";
import * as voteApi from "~/lib/api/voteApi";
import VoteList from "./VoteList";
import { authState } from "~/redux/slices/authSlice";
interface Props {
	productId: number;
}

interface InitialValues {
	content: string;
}

const VoteWrapper: React.FC<Props> = ({ productId }: Props) => {
	const dispatch = useDispatch();

	const { list, currentVote } = useSelector(voteState);
	const { currentUser } = useSelector(authState);

	const [rate, setRate] = React.useState<number>(0);
	const [form] = Form.useForm();

	const token = getToken();
	React.useEffect(() => {
		if (token) {
			(async () => {
				try {
					dispatch(voteActions.fetch());
					const res = await voteApi.getVotes(token, {
						productId,
						limit: 10,
					});
					if (res.status === 200) {
						dispatch(voteActions.getVotes(res.data.items));
						if (
							currentUser &&
							res.data.items[0].userId === currentUser.id
						) {
							dispatch(
								voteActions.getCurrentVote(res.data.items[0])
							);
							setRate(res.data.items[0].rate);
							form.setFieldValue(
								"content",
								res.data.items[0].content
							);
						}
					}
				} catch (error) {
					dispatch(voteActions.error());
				}
			})();
		}
	}, [currentUser, dispatch, productId, form]);

	const handleChange = (value: number) => {
		setRate(value);
	};

	const handleSubmit = async (values: InitialValues) => {
		if (token) {
			try {
				dispatch(voteActions.fetch());

				if (currentVote && currentVote.id) {
					const res = await voteApi.updateVote(
						token,
						currentVote.id,
						{
							productId,
							content: values.content,
							rate,
						}
					);

					if (res.status === 200) {
						dispatch(voteActions.updateVote(res.data));
					}
				} else {
					const res = await voteApi.createVote(token, {
						productId,
						content: values.content,
						rate,
					});

					if (res.status === 201) {
						dispatch(voteActions.createVote(res.data));
					}
				}
			} catch (error) {
				dispatch(voteActions.error());
			}
		}
	};

	return (
		<section>
			<Row>
				<Col xs={24} style={{ textAlign: "center" }}>
					<Rate
						style={{ fontSize: 26 }}
						onChange={handleChange}
						value={rate}
					/>
				</Col>
			</Row>
			<Comment
				avatar={
					<Avatar
						src="https://joeschmoe.io/api/v1/random"
						alt="Han Solo"
					/>
				}
				content={
					<Form
						form={form}
						initialValues={
							{
								content: "",
							} as InitialValues
						}
						onFinish={handleSubmit}
					>
						<Form.Item name="content">
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item>
							<Button
								htmlType="submit"
								type="primary"
								// loading={productDetailPage.isLoading}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				}
			/>
			<h4>Voting list</h4>
			<VoteList list={list} />
		</section>
	);
};

export default React.memo(VoteWrapper);
