import { Form, Input, message, Modal, Radio, Select } from "antd";
import { Meta } from "interfaces/meta";
import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { bannerActions, bannerState } from "redux/slice/banner";
import { metaState } from "redux/slice/meta";
import { getURL } from "utils";
import * as uploadApi from "api/uploadApi";
interface Props {
	visible: boolean;
	onCancel: Function;
	cx: Function;
}

interface InitialValues {
	slug: string;
	description: string;
	isShow: boolean;
	metaId: number;
}

const ModalBanner: React.FC<Props> = (props: Props) => {
	const { visible, onCancel, cx } = props;

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const id: string = React.useId();

	const { accessToken } = useSelector(authState);
	const { newBanner } = useSelector(metaState);
	const { bannerList } = useSelector(bannerState);
	const { current, isLoading } = bannerList;

	const [files, setFiles] = React.useState<FileList | null>(null);

	const handleSubmit = async (values: InitialValues) => {
		if (accessToken) {
			let thumbnail = current ? current.thumbnail : "";
			const formData = new FormData();
			if (files) {
				formData.append("thumbnail", files[0]);
			}
			try {
				if (files) {
					const res = await uploadApi.uploadSingle(formData);

					if (res.data) {
						thumbnail = res.data.path;
					}
				}

				if (current) {
					// dispatch(
					// 	bannerActions.updateBannerFetch({
					// 		accessToken,
					// 		dispatch,
					// 		body: {
					// 			id: current.id,
					// 			...values,
					// 			thumbnail,
					// 		},
					// 		afterSuccess: () => onCancel(),
					// 	})
					// );
				} else {
					// dispatch(
					// 	bannerActions.addBannerFetch({
					// 		accessToken,
					// 		dispatch,
					// 		body: { ...values, thumbnail },
					// 		afterSuccess: () => onCancel(),
					// 	})
					// );
				}
			} catch (error) {
				if (files && thumbnail && ((current && thumbnail !== current.thumbnail) || thumbnail)) {
					await uploadApi.deleteMany([{ path: thumbnail }]);
				}
				message.error(`${current ? "Edit" : "Add new"} Failure`);
			}
		}
	};

	return (
		<Modal
			visible={visible}
			onCancel={() => onCancel()}
			title={current ? "Edit banner" : "Add new banner"}
			okText={current ? "Edit" : "Add"}
			destroyOnClose={true}
			mask={false}
			onOk={form.submit}
			confirmLoading={isLoading}
			width={600}
		>
			<Form
				initialValues={
					{
						slug: current ? current.slug : "",
						description: current ? current.description : "",
						metaId: current ? current.metaId : -1,
						isShow: current ? current.isShow : true,
					} as InitialValues
				}
				form={form}
				onFinish={handleSubmit}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				labelAlign="left"
			>
				<Form.Item
					label="Meta"
					name="metaId"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
						() => ({
							validator(_, value) {
								if (value !== -1) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("This field is required"));
							},
						}),
					]}
				>
					<Select>
						<Select.Option value={-1}>Select meta</Select.Option>
						{newBanner.list.map((item: Meta) => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Slug"
					name="slug"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Visibility" name="isShow">
					<Radio.Group>
						<Radio value={true}> Visible </Radio>
						<Radio value={false}> Hidden </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="Description" name="description">
					<Input.TextArea />
				</Form.Item>
				<Form.Item label="Banner">
					<label htmlFor={id} className={cx("label-img")}>
						{files && files[0] ? (
							<img src={URL.createObjectURL(files[0])} alt="" />
						) : current && current.thumbnail ? (
							<img src={getURL(current.thumbnail)} alt="" />
						) : (
							<>
								<span>
									<BiImageAdd />
								</span>
								<div>Upload here</div>
							</>
						)}
					</label>
				</Form.Item>
				<input type="file" id={id} accept="image/*" hidden onChange={(e) => setFiles(e.target.files)} />
			</Form>
		</Modal>
	);
};
export default React.memo(ModalBanner);
