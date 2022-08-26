import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Space, Tree, Upload } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/lib/upload";
import { getAllCategories } from "api/categoryApi";
import { createProduct } from "api/productApi";
import { createManyProductCategories } from "api/productCategoryApi";
import { createProductOption } from "api/productOptionApi";
import { createManyProductOptionValues } from "api/productOptionValueApi";
import { getAllVariants } from "api/variantApi";
import Paper from "components/Paper";
import config from "config";
import { API } from "constant";
import { useTitle } from "hooks/useTitle";
import { Category } from "interfaces/category";
import { Variant } from "interfaces/variant";
import { VariantValue } from "interfaces/variantValue";
import React from "react";
import { AiOutlineLoading, AiOutlineUpload } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
// import classNames from "classnames/bind";
// import styles from "./NewProductPage.module.scss";
// const cx = classNames.bind(styles);

interface InitialValuesType {
	name: string;
	price: number;
	newPrice: number;
	slug: string;
	thumbnail: string;
	description: string;
}
function treeData(list: Category[]): any {
	return list.map((item: Category) => {
		if (item.children && item.children.length > 0)
			return {
				key: item.id,
				title: item.title,
				children: treeData(item.children),
			};
		return {
			key: item.id,
			title: item.title,
		};
	});
}
interface Option {
	title: string;
	variantValues: Array<VariantValue>;
	sku: string;
	amount: number;
	thumbnail: string;
}

interface CheckedVariant {
	name: string;
	variantValues: Array<VariantValue>;
}

interface InitState {
	checkedCategoryKeys: React.Key[];
	imageUrl: string;
	formLoading: boolean;
	thumbnailLoading: boolean;
	checkedVariants: Array<CheckedVariant>;
	options: Array<Option>;
	error: boolean;
	variants: Array<Variant>;
	categories: Array<Category>;
}

const initState: InitState = {
	checkedCategoryKeys: [],
	imageUrl: "",
	formLoading: false,
	thumbnailLoading: false,
	checkedVariants: [],
	options: [],
	error: false,
	variants: [],
	categories: [],
};

enum ActionKind {
	SET_OPTIONS = "set_options",
	SET_CHECKED_KEYS = "set_checked_keys",
	FORM_LOADING = "form_loading",
	UPLOADING = "uploading",
	UPLOAD_DONE = "upload_done",
	UPLOAD_OPTION_THUMBNAIL_DONE = "upload_option_thumbnail_done",
	CHECK_VARIANT = "check_variant",
	FETCH_DATA = "fetch_data",
	SET_OPTION_AMOUNT = "set_option_amount",
	UPLOAD_VARIANT_VALUE_THUMBNAIL = "upload_variant_value_thumbnail",
}

interface Action {
	type: ActionKind;
	payload: any;
}

const reducer = (state: InitState, action: Action) => {
	const { type, payload } = action;
	let newOptions: Array<Option> = [];
	switch (type) {
		case ActionKind.SET_OPTIONS:
			const { options } = payload;

			newOptions = options.map((variantValues: Array<VariantValue>) => {
				let title: string = "";
				let sku: string = "" + new Date().getTime();
				variantValues.forEach((variantValue: VariantValue, index: number) => {
					if (index === variantValues.length - 1) {
						title += variantValue.name;
					} else {
						title += `${variantValue.name} / `;
					}
					sku += variantValue.id;
				});
				const newOption: Option = {
					title,
					variantValues,
					sku,
					amount: 0,
					thumbnail: "",
				};
				return newOption;
			});

			return {
				...state,
				options: newOptions,
			};
		case ActionKind.SET_OPTION_AMOUNT:
			const { index, amount } = payload;

			newOptions = [...state.options];
			newOptions[index].amount = amount;

			return {
				...state,
				options: newOptions,
			};
		case ActionKind.UPLOAD_OPTION_THUMBNAIL_DONE:
			const { variantValue, imageUrl } = payload;
			newOptions = state.options.map((option: Option) => {
				const indexOption = option.variantValues.findIndex((item: VariantValue) => item.id === variantValue.id);
				if (indexOption !== -1) {
					return {
						...option,
						thumbnail: imageUrl,
					};
				}
				return option;
			});
			return {
				...state,
				options: newOptions,
			};
		default:
			return {
				...state,
				...payload,
			};
	}
};

const NewProductPage: React.FC = () => {
	useTitle(config.titles.newProduct);

	const { accessToken } = useSelector(authState);
	const dispatchReactRedux = useDispatch();

	const [{ formLoading, thumbnailLoading, checkedCategoryKeys, imageUrl, checkedVariants, options, categories, variants }, dispatch] = React.useReducer(
		reducer,
		initState
	);
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (formLoading) {
			form.submit();
		}
	}, [form, formLoading]);

	const onFinish = async (values: InitialValuesType) => {
		if (accessToken) {
			try {
				const reqDataProduct: any = {
					name: values.name,
					description: values.description,
					price: values.price,
					newPrice: values.newPrice,
					slug: values.slug,
				};
				if (imageUrl === "") {
					const thumbnailOption = options.find((item: Option) => item.thumbnail);
					reqDataProduct.thumbnail = thumbnailOption ? thumbnailOption.thumbnail : "";
				} else {
					reqDataProduct.thumbnail = imageUrl;
				}

				// Create Product
				const res = await createProduct(accessToken, dispatchReactRedux, reqDataProduct);
				const product = res.data.data;

				// Create product category
				await createManyProductCategories(
					accessToken,
					dispatchReactRedux,
					checkedCategoryKeys.map((item: React.Key) => ({ categoryId: item, productId: product.id }))
				);

				// Create product option
				const resPromises = await Promise.allSettled(
					options.map((option: Option) => {
						const { sku, amount, thumbnail, title } = option;
						return createProductOption(accessToken, dispatchReactRedux, { sku, amount, thumbnail, title, productId: product.id, weight: 50 });
					})
				);

				const promises: any = [];

				resPromises.forEach((result: PromiseSettledResult<any>, index: number) => {
					if (result.status === "fulfilled") {
						console.log(result.value.data);
						promises.push(
							createManyProductOptionValues(
								accessToken,
								dispatchReactRedux,
								options[index].variantValues.map((variantValue: VariantValue) => {
									return {
										productOptionId: result.value.data.data.id,
										variantValueId: variantValue.id,
									};
								})
							)
						);
					}
				});

				await Promise.allSettled(promises);

				message.success("Thêm thành công");

				console.log("options: ", options);
			} catch (error) {
				console.log(error);
			}
			dispatch({ type: ActionKind.FORM_LOADING, payload: { loading: false } });
		}
	};

	const onCheckCategory = (checkedKeysValue: any) => {
		dispatch({ type: ActionKind.SET_CHECKED_KEYS, payload: { checkedCategoryKeys: checkedKeysValue } });
	};

	React.useEffect(() => {
		(async () => {
			try {
				const resPromise = await Promise.allSettled([
					getAllCategories({ depth: 3, parentId: "null", sortType: "asc" }),
					getAllVariants({
						sortType: "asc",
					}),
				]);

				const _categories = resPromise[0].status === "fulfilled" ? resPromise[0].value.data.data.items : [];
				const _variants = resPromise[1].status === "fulfilled" ? resPromise[1].value.data.data.items : [];

				dispatch({ type: ActionKind.FETCH_DATA, payload: { categories: _categories, variants: _variants } });
			} catch (error) {}
		})();
	}, [dispatch]);

	const uploadButton = (
		<div>
			{thumbnailLoading ? <AiOutlineLoading /> : <BiImageAdd />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			dispatch({ type: ActionKind.UPLOADING, payload: { thumbnailLoading: true } });
		}
		if (info.file.status === "done") {
			dispatch({ type: ActionKind.UPLOAD_DONE, payload: { thumbnailLoading: false, imageUrl: info.file.response } });
		}
	};

	const handleChangeUploadOptionThumbnail = (info: UploadChangeParam<UploadFile>, variantValue: VariantValue) => {
		if (info.file.status === "done") {
			dispatch({ type: ActionKind.UPLOAD_OPTION_THUMBNAIL_DONE, payload: { imageUrl: info.file.response, variantValue } });
		}
	};

	const handleCheckVariant = (e: CheckboxChangeEvent, indexVariant: number, indexVariantValue: number) => {
		if (checkedVariants.length === 0) {
			const arr: Array<{
				name: string;
				variantValues: Array<VariantValue>;
			}> = variants.map((item: Variant) => ({
				name: item.name,
				variantValues: [],
			}));
			const variantValue: VariantValue = variants[indexVariant].variantValues[indexVariantValue];
			if (e.target.checked) {
				arr[indexVariant].variantValues.push(variantValue);
			}
			dispatch({ type: ActionKind.CHECK_VARIANT, payload: { checkedVariants: arr } });
		} else {
			const arr = [...checkedVariants];
			const variantValue: VariantValue = variants[indexVariant].variantValues[indexVariantValue];
			if (e.target.checked) {
				arr[indexVariant].variantValues.push(variantValue);
			} else {
				arr[indexVariant].variantValues = arr[indexVariant].variantValues.filter((item: VariantValue) => item.id !== variantValue.id);
			}
			dispatch({ type: ActionKind.CHECK_VARIANT, payload: { checkedVariants: arr } });
		}
	};

	const handleCreateOptions = () => {
		const count = checkedVariants.reduce((prev: number, cur: any) => (cur.variantValues.length !== 0 ? prev * cur.variantValues.length : prev), 1);
		let results = new Array(count).fill("");
		checkedVariants.forEach((checkedVariant: any, index1: number) => {
			if (checkedVariant.variantValues.length > 0)
				results = results.map((result: any, index: number) => {
					if (index1 === checkedVariants.length - 1) {
						return [...result, checkedVariant.variantValues[Math.floor(index % checkedVariant.variantValues.length)]];
					} else {
						return [...result, checkedVariant.variantValues[Math.floor((index * checkedVariant.variantValues.length) / count)]];
					}
				});
		});
		dispatch({ type: ActionKind.SET_OPTIONS, payload: { options: results } });
	};

	return (
		<Form
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 18 }}
			labelAlign="left"
			onFinish={onFinish}
			initialValues={{
				name: "",
				price: 0,
				newPrice: 0,
				slug: "",
				thumbnail: "",
				description: "<p></p>",
			}}
			form={form}
		>
			<>
				<div style={{ marginBottom: 8 }}>
					<Button
						type="primary"
						style={{ marginRight: 8 }}
						onClick={() => dispatch({ type: ActionKind.FORM_LOADING, payload: { formLoading: true } })}
						htmlType="button"
						loading={formLoading}
					>
						Submit
					</Button>
					<Button type="default" htmlType="button">
						Reset
					</Button>
				</div>
				<Row gutter={[16, 16]}>
					<Col md={12} xs={24}>
						<Paper>
							<h2>Product Information</h2>
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
							<Form.Item
								name="price"
								label="Price"
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
							>
								<InputNumber />
							</Form.Item>
							<Form.Item name="newPrice" label="New Price">
								<InputNumber />
							</Form.Item>
							<Form.Item label="Description" name="description">
								<ReactQuill value="" onChange={() => {}} />
							</Form.Item>
						</Paper>
						<Paper style={{ marginTop: 16 }}>
							<h2>Categories</h2>
							<Tree checkable onCheck={onCheckCategory} checkedKeys={checkedCategoryKeys} treeData={treeData(categories)} />
						</Paper>
					</Col>
					<Col xs={24} md={12}>
						<Paper>
							<h2>Thumbnail</h2>
							<Upload
								name="file"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action={`${API.BASE_URL}/upload`}
								onChange={handleChange}
							>
								{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
							</Upload>
						</Paper>
						<Paper style={{ marginTop: 16 }}>
							<h2>Variant</h2>
							<Space wrap>
								{variants.map((variant: Variant, index: number) => {
									return variant.variantValues?.map((variantValue: VariantValue, ind: number) => {
										return (
											<Checkbox onChange={(e) => handleCheckVariant(e, index, ind)} key={variantValue.id}>
												{variantValue.name}
											</Checkbox>
										);
									});
								})}
							</Space>
							<div style={{ marginBlock: 16, textAlign: "center" }}>
								<Button type="primary" onClick={handleCreateOptions}>
									Create Options
								</Button>
							</div>
							<Row gutter={[8, 8]}>
								<Col xs={12}>
									<Space direction="vertical">
										{options.map((item: Option, index: number) => {
											return (
												<Space style={{ flex: 1 }} key={index}>
													<div>{item.title}</div>
													<input
														type="number"
														placeholder="amount"
														autoComplete="false"
														style={{ maxWidth: 80 }}
														onChange={(e) =>
															dispatch({
																type: ActionKind.SET_OPTION_AMOUNT,
																payload: { index, amount: parseInt(e.target.value) },
															})
														}
													/>
												</Space>
											);
										})}
									</Space>
								</Col>
								<Col xs={12}>
									<Space direction="vertical">
										{options.length > 0 &&
											checkedVariants.map((checkedVariant: CheckedVariant, index: number) => {
												return checkedVariant.variantValues.map((variantValue: VariantValue) => (
													<Space style={{ flex: 1 }} key={variantValue.id}>
														<div>{variantValue.name}</div>
														<Upload
															name="file"
															className="avatar-uploader"
															action={`${API.BASE_URL}/upload`}
															onChange={(info: UploadChangeParam<UploadFile>) => {
																handleChangeUploadOptionThumbnail(info, variantValue);
															}}
														>
															<Button icon={<AiOutlineUpload />}>Upload</Button>
														</Upload>
													</Space>
												));
											})}
									</Space>
								</Col>
							</Row>
						</Paper>
					</Col>
				</Row>
			</>
		</Form>
	);
};

export default NewProductPage;
