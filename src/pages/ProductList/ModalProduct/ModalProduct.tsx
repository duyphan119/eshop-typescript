import { Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import classNames from "classnames/bind";
import { Category } from "interfaces/category";
import React from "react";
import { AiOutlineUpload } from "react-icons/ai";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import {
	// useDispatch,
	useSelector,
} from "react-redux";
// import { authState } from "redux/slice/auth.slice";
import { categoryState } from "redux/slice/category";
import { productState } from "redux/slice/product.slice";
import { getURL, toSlug } from "utils";
import styles from "./ModalProduct.module.scss";
const cx: Function = classNames.bind(styles);
cx("");
interface Props {
	onCancel: Function;
	visible: boolean;
}

interface FormType {
	categoryIndex: number;
	name: string;
	price: number;
	newPrice: number;
	slug: string;
	description: string;
}

const ModalProduct: React.FC<Props> = (props: Props) => {
	const { visible, onCancel } = props;

	// const { accessToken } = useSelector(authState);
	const { list: categoryList } = useSelector(categoryState);
	const { current, isLoadingForm } = useSelector(productState);

	const [files, setFiles] = React.useState<FileList | null>(null);
	const id = React.useId();

	// const dispatch = useDispatch();

	const [form] = Form.useForm();

	const handleSubmit = (values: FormType) => {
		// console.log("Success: ", { ...values, file: files ? files[0] : null });
		// let formData;
		// const index = values.categoryIndex;
		// if (index !== -1) {
		//   if (files) {
		//     formData = new FormData();
		//     formData.append("file", files[0]);
		//   }
		//   let data: ProductPayload = {
		//     ...current,
		//     ...values,
		//     categoryId: categoryList[index].id,
		//     category: categoryList[index],
		//     formData,
		//     dispatch,
		//     accessToken,
		//     afterSuccess: () => onCancel(),
		//   };
		//   if (current) {
		//     dispatch(productActions.updateProductFetch(data));
		//   } else {
		//     dispatch(productActions.addProductFetch(data));
		//   }
		// }
	};
	const handleChange = (value: number) => {
		form.setFieldsValue({
			parentIndex: value,
		});
	};

	return (
		<Modal
			onCancel={() => onCancel()}
			visible={visible}
			title={current ? "Edit product" : "Add new product"}
			destroyOnClose={true}
			mask={false}
			okText={current ? "Edit" : "Add"}
			onOk={form.submit}
			width="960px"
			confirmLoading={isLoadingForm}
		>
			{categoryList.length === 0 ? (
				<div>Chưa có dữ liệu danh mục, hãy bổ sung dữ liệu danh mục để thao tác đến dữ liệu sản phẩm</div>
			) : (
				<Row gutter={16}>
					<Col xs={14}>
						<Form
							form={form}
							onFinish={handleSubmit}
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							initialValues={{
								title: current ? current.name : "",
								price: current ? current.price : 0,
								newPrice: current ? current.newPrice : 0,
								slug: current ? current.slug : "",
								description: current ? current.description : "",
							}}
						>
							<Form.Item label="Danh mục" name="categoryIndex">
								<Select onChange={handleChange}>
									{categoryList.map((item: Category, index: number) => {
										if (current && current.id === item.id) return "";
										return (
											<Select.Option key={index} value={index}>
												{item.title}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>
							<Form.Item
								label="Tên"
								name="title"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập tên!",
									},
								]}
							>
								<Input
									onChange={(e) =>
										form.setFieldsValue({
											slug: toSlug(e.target.value),
										})
									}
								/>
							</Form.Item>
							<Form.Item
								label="Giá"
								name="price"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập giá bán!",
									},
								]}
							>
								<InputNumber min={0} />
							</Form.Item>
							<Form.Item label="Giá mới" name="newPrice">
								<InputNumber min={0} />
							</Form.Item>
							<Form.Item
								label="Slug"
								name="slug"
								rules={[
									{
										required: true,
										message: "Vui lòng nhập Slug!",
									},
								]}
							>
								<Input />
							</Form.Item>
							{/* <Form.Item label="Mô tả" name="description">
                <ReactQuill />
              </Form.Item> */}
						</Form>
					</Col>
					<Col xs={10}>
						<label htmlFor={id} className={cx("label-img")}>
							{files && files[0] ? (
								<img src={URL.createObjectURL(files[0])} alt="" />
							) : current && current.thumbnail ? (
								<img src={getURL(current.thumbnail)} alt="" />
							) : (
								<>
									<AiOutlineUpload /> Tải ảnh đại diện
								</>
							)}
						</label>
						<input type="file" id={id} accept="image/*" hidden onChange={(e) => setFiles(e.target.files)} />
					</Col>
				</Row>
			)}
		</Modal>
	);
};

export default React.memo(ModalProduct);
