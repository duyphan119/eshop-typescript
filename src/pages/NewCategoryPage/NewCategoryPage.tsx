import { Button, Form, Input, message, Select, Upload, UploadProps } from "antd";
import classNames from "classnames/bind";
import config from "config";
import { useTitle } from "hooks/useTitle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, categoryState } from "redux/slice/category";
import styles from "./NewCategoryPage.module.scss";

import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import Paper from "components/Paper";
import { API } from "constant";
import { Category, CreateCategoryPayload } from "interfaces/category";
import { CategoryType } from "interfaces/categoryType";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { authState } from "redux/slice/auth.slice";
import { categoryTypeActions, categoryTypeState } from "redux/slice/categoryType";
import { useParams, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

interface InitialValues {
	title: string;
	name: string;
	categoryTypeIndex: number;
	parentIndex: number;
	description: string;
	slug: string;
}

const NewCategoryPage: React.FC = () => {
	useTitle(config.titles.newCategory);

	const { categories, currentCategory: current } = useSelector(categoryState);
	const { categoryTypes } = useSelector(categoryTypeState);
	const { accessToken } = useSelector(authState);
	const { categoryId } = useParams();

	const dispatch = useDispatch();

	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = React.useState<string>("");
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		dispatch(
			categoryActions.getAllCategoriesFetch({
				sortType: "asc",
			})
		);
		dispatch(
			categoryTypeActions.getAllCategoryTypesFetch({
				sortType: "asc",
			})
		);
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(categoryActions.getCurrentCategory(categoryId ? categories.items.find((item: Category) => "" + item.id === categoryId) || null : null));
	}, [dispatch, categoryId, categories.items]);

	React.useEffect(() => {
		form.setFieldsValue({
			title: current ? current.title : "",
			name: current ? current.name : "",
			categoryTypeIndex: current ? categoryTypes.items.findIndex((item: CategoryType) => item.id === current.categoryTypeId) : 0,
			parentIndex: current ? categories.items.findIndex((item: Category) => item.id === current.id) : -1,
			description: current ? current.description : "",
			slug: current ? current.slug : "",
		});
		setImageUrl(current ? "" + current.thumbnail : "");
	}, [current, form, categories.items, categoryTypes.items]);

	const onFinish = async (values: InitialValues) => {
		if (accessToken) {
			const { parentIndex, categoryTypeIndex, ...others } = values;

			if (current) {
				console.log({
					...others,
					parentId: parentIndex === -1 ? null : categories.items[parentIndex].id || null,
					categoryTypeId: categoryTypes.items[categoryTypeIndex].id,
					thumbnail: imageUrl,
				});
				dispatch(
					categoryActions.updateCategoryFetch({
						accessToken,
						dispatch,
						data: {
							...others,
							parentId: parentIndex === -1 ? null : categories.items[parentIndex].id || null,
							categoryTypeId: categoryTypes.items[categoryTypeIndex].id,
							thumbnail: imageUrl,
						},
						onDone,
						id: current.id,
					})
				);
			} else {
				dispatch(
					categoryActions.createCategoryFetch({
						accessToken,
						dispatch,
						data: {
							...others,
							parentId: parentIndex === -1 ? null : categories.items[parentIndex].id || null,
							categoryTypeId: categoryTypes.items[categoryTypeIndex].id,
							thumbnail: imageUrl,
						},
						onDone,
					})
				);
			}
		}
	};

	function onDone() {
		if (current) {
			message.success("Updated Category");
		} else {
			message.success("Created new User");
			form.setFieldsValue({
				title: "",
				name: "",
				categoryTypeIndex: 0,
				parentIndex: -1,
				description: "",
				slug: "",
			});
			setImageUrl("");
		}
	}

	const uploadButton = (
		<div>
			{loading ? <AiOutlineLoading /> : <AiOutlinePlus />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true);
		}
		if (info.file.status === "done") {
			setLoading(false);
			setImageUrl(info.file.response);
		}
	};

	return (
		<Form labelCol={{ span: 3 }} form={form} wrapperCol={{ span: 8 }} labelAlign="left" initialValues={{}} onFinish={onFinish}>
			<Paper>
				<h2>Information</h2>
				<Form.Item
					style={{ fontSize: 10 }}
					name="title"
					label="Title"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="slug"
					label="Slug"
					rules={[
						{
							required: true,
							message: "This field is required",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input />
				</Form.Item>
				<Form.Item name="categoryTypeIndex" label="Type">
					<Select>
						{categoryTypes.items.map((item: CategoryType, index: number) => {
							return (
								<Select.Option key={index} value={index}>
									{item.id} - {item.name}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item name="parentIndex" label="Parent">
					<Select>
						<Select.Option value={-1}>No Parent</Select.Option>
						{categories.items.map((item: Category, index: number) => {
							return (
								<Select.Option key={item.id} value={index}>
									{item.id} - {item.name}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label="Thumbnail" name="thumbnail">
					<Upload
						name="file"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action={`${API.BASE_URL}/upload/category`}
						onChange={handleChange}
					>
						{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
					</Upload>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 3, span: 8 }}>
					<Button type="primary" style={{ marginRight: 8 }} htmlType="submit">
						Submit
					</Button>
					<Button type="default" htmlType="button">
						Reset
					</Button>
				</Form.Item>
			</Paper>
		</Form>
	);
};

export default NewCategoryPage;
