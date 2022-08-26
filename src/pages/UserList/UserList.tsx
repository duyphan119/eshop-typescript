import { Avatar, Button, Form, Input, Popconfirm, Select, Table, Tooltip } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import Paper from "components/Paper";
import config from "config";
import { useTitle } from "hooks/useTitle";
import { User } from "interfaces/user";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/slice/auth.slice";
import { userActions, userState } from "redux/slice/user";
import ModalUser from "./ModalUser";
import styles from "./UserList.module.scss";
interface Props {}
const cx = classNames.bind(styles);
const UserList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.userList);
	const dispatch = useDispatch();
	const { accessToken } = useSelector(authState);
	const { users, isLoading } = useSelector(userState);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
	const [openModal, setOpenModal] = React.useState<boolean>(false);
	const [page, setPage] = React.useState<number>(1);
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [form] = Form.useForm();

	const columns: ColumnsType<User> = [
		{
			title: "Avatar",
			dataIndex: "avatar",
			render: (text: string) => <Avatar src={text} alt={text} shape="square" style={{ width: 60, height: 60 }} />,
			width: 80,
		},
		{
			title: "Full Name",
			dataIndex: "fullName",
			sorter: (a: User, b: User) => a.fullName.length - b.fullName.length,
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: (a: User, b: User) => a.email.length - b.email.length,
		},
		{
			title: "Phone",
			dataIndex: "phone",
			sorter: (a: User, b: User) => a.phone.length - b.phone.length,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: User) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(userActions.getCurrentUser(row));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
					&nbsp;&nbsp;
					<Popconfirm
						placement="topRight"
						title={"Are you sure ?"}
						onConfirm={() => {
							if (accessToken) {
								dispatch(
									userActions.deleteUserFetch({
										id: row.id,
										dispatch,
										accessToken,
										onDone: onDeleteDone,
									})
								);
							}
						}}
						okText="Có"
						cancelText="Không"
					>
						<Tooltip title="Delete" placement="bottom">
							<Button type="primary" danger size="small" icon={<AiOutlineDelete />} />
						</Tooltip>
					</Popconfirm>
				</>
			),
		},
	];

	function onDeleteDone() {
		if (accessToken) {
			if (users.items.length > 1) {
				dispatch(
					userActions.getAllUsersFetch({
						params: {
							p: page,
							limit: pageSize,
						},
						accessToken,
						dispatch,
					})
				);
			} else {
				setPage((prev) => (prev === 0 ? 0 : prev - 1));
			}
		}
	}

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection: TableRowSelection<User> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};
	React.useEffect(() => {
		if (accessToken) {
			dispatch(
				userActions.getAllUsersFetch({
					params: {
						p: page,
						limit: pageSize,
					},
					accessToken,
					dispatch,
				})
			);
		}
	}, [dispatch, accessToken, page, pageSize]);

	const onAddDone = () => {
		if (page > 1) {
			setPage(1);
		}
	};

	const handleSearch = (value: string) => {
		if (accessToken) {
			dispatch(
				userActions.getAllUsersFetch({
					params: {
						p: page,
						limit: pageSize,
						...(value ? { [form.getFieldValue("searchBy")]: value } : {}),
					},
					accessToken,
					dispatch,
				})
			);
		}
	};
	return (
		<Paper>
			{openModal && <ModalUser visible={openModal} onCancel={() => setOpenModal(false)} onAddDone={onAddDone} />}
			<div className={cx("buttons")}>
				<div>
					<Tooltip title="New user">
						<Button
							type="primary"
							onClick={() => {
								setOpenModal(true);
								dispatch(userActions.getCurrentUser(null));
							}}
						>
							New
						</Button>
					</Tooltip>
					<Tooltip title="Delete selected users">
						<Button
							type="primary"
							disabled={selectedRowKeys.length === 0}
							danger
							onClick={() => {
								if (accessToken) {
									dispatch(userActions.deleteManyUserFetch({ ids: selectedRowKeys, accessToken, dispatch }));
								}
							}}
						>
							Delete
						</Button>
					</Tooltip>
				</div>

				<div style={{ display: "flex" }}>
					<Form initialValues={{ searchBy: "fullName" }} form={form}>
						<Form.Item name="searchBy">
							<Select>
								<Select.Option value="fullName">Full Name</Select.Option>
								<Select.Option value="email">Email</Select.Option>
								<Select.Option value="phone">Phone</Select.Option>
							</Select>
						</Form.Item>
					</Form>
					<Input.Search
						{...{
							placeholder: "Search here",
							allowClear: true,
							onSearch: handleSearch,
						}}
					/>
				</div>
			</div>
			<Table
				rowSelection={rowSelection}
				dataSource={users.items.map((user: User) => ({ ...user, key: user.id }))}
				pagination={{
					pageSize,
					total: users.count,
					current: page,
					onChange: (page: number, pageSize: number) => {
						setPage(page);
						setPageSize(pageSize);
					},
					showSizeChanger: true,
					pageSizeOptions: [10, 50, 100, 200],
				}}
				loading={isLoading}
				columns={columns}
			/>
		</Paper>
	);
};
export default UserList;
