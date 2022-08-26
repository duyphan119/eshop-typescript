import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalCategory.module.scss";
import { Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { categoryState, categoryActions } from "redux/slice/category";
import { Category } from "interfaces/category";
import { toSlug } from "utils";
import { authState } from "redux/slice/auth.slice";

const cx: Function = classNames.bind(styles);
cx("");
interface Props {
	onCancel: Function;
	visible: boolean;
}
const ModalCategory: React.FC<Props> = (props: Props) => {
	const { visible, onCancel } = props;

	const { accessToken } = useSelector(authState);
	const { current, isLoadingForm, list } = useSelector(categoryState);

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		const index = values.parentIndex === "-1" || !values.parentIndex ? -1 : parseInt(values.parentIndex);
		const parentId = index === -1 ? null : list[index].id;
		const parent = index === -1 ? null : list[index];
		const data = { ...values, parentId, parent };
		if (current) {
			dispatch(
				categoryActions.updateCategoryFetch({
					...current,
					...data,
					dispatch,
					accessToken,
					afterSuccess: () => {
						onCancel();
					},
				})
			);
		} else {
			// dispatch(
			//   categoryActions.addCategoryFetch({
			//     ...data,
			//     dispatch,
			//     accessToken,
			//     afterSuccess: () => {
			//       onCancel();
			//     },
			//   })
			// );
		}
	};
	const handleChange = (value: string) => {
		form.setFieldsValue({
			parentIndex: value,
		});
	};
	return (
		<Modal
			onCancel={() => onCancel()}
			visible={visible}
			title={current ? "Sửa danh mục" : "Thêm danh mục"}
			destroyOnClose={true}
			mask={false}
			okText={current ? "Sửa" : "Thêm"}
			cancelText="Đóng"
			onOk={form.submit}
			confirmLoading={isLoadingForm}
		>
			<Form
				form={form}
				onFinish={handleSubmit}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				initialValues={{
					parentIndex: current ? "" + list.findIndex((item: Category) => item.id === current.parentId) : "-1",
					title: current ? current.title : "",
					slug: current ? current.slug : "",
				}}
			>
				<Form.Item label="Danh mục cha" name="parentIndex">
					<Select onChange={handleChange}>
						<Select.Option value="-1">Không có</Select.Option>
						{list.map((item: Category, index: number) => {
							if (current && current.id === item.id) return "";
							return (
								<Select.Option key={index} value={"" + index}>
									{item.title}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label="Tên" name="title" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
					<Input
						onChange={(e) =>
							form.setFieldsValue({
								slug: toSlug(e.target.value),
							})
						}
					/>
				</Form.Item>
				<Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Vui lòng nhập Slug!" }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalCategory;
