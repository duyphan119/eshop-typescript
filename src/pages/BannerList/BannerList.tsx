import React from "react";
import classNames from "classnames/bind";
import styles from "./BannerList.module.scss";
import Paper from "components/Paper";
import { useDispatch, useSelector } from "react-redux";
import { bannerActions, bannerState } from "redux/slice/banner";
import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { Banner } from "interfaces/banner";
import {
	AiFillCheckSquare,
	AiFillCloseSquare,
	AiOutlineDelete,
	AiOutlineEdit,
} from "react-icons/ai";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import { useTitle } from "hooks/useTitle";
import config from "config";
import ModalBanner from "./ModalBanner";
import { metaActions } from "redux/slice/meta";
import { getURL } from "utils";
interface Props {}
const cx = classNames.bind(styles);
const BannerList: React.FC<Props> = (props: Props) => {
	useTitle(config.titles.bannerList);

	const dispatch = useDispatch();

	const { bannerList } = useSelector(bannerState);

	const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
		[]
	);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const columns: ColumnsType<Banner> = [
		{
			title: "Thumbnail",
			dataIndex: "thumbnail",
			render: (text: string, row: Banner) => (
				<img
					src={getURL(text)}
					className={cx("cell-thumbnail")}
					alt=""
				/>
			),
			width: 300,
		},
		{
			title: "Slug",
			dataIndex: "slug",
			sorter: (a: Banner, b: Banner) => a.slug.length - b.slug.length,
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a: Banner, b: Banner) =>
				a.description.length - b.description.length,
		},
		{
			title: "Visibility",
			dataIndex: "isShow",
			sorter: (a: Banner, b: Banner) => (a.isShow === true ? 1 : -1),
			render: (text: string, row: Banner) => (
				<span
					className={cx("cell-visibility", {
						visible: row.isShow,
					})}
				>
					{row.isShow ? <AiFillCheckSquare /> : <AiFillCloseSquare />}
				</span>
			),
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (text: string, row: Banner) => (
				<>
					<Tooltip title="Edit">
						<Button
							type="primary"
							size="small"
							onClick={() => {
								setOpenModal(true);
								dispatch(bannerActions.getCurrentBanner(row));
							}}
							icon={<AiOutlineEdit />}
						/>
					</Tooltip>
					&nbsp;&nbsp;
					<Popconfirm
						placement="topRight"
						title={"Are you sure ?"}
						onConfirm={() => {
							// dispatch(
							// 	productActions.deleteProductFetch({
							// 		...row,
							// 		dispatch,
							// 		accessToken,
							// 	})
							// );
						}}
						okText="Có"
						cancelText="Không"
					>
						<Tooltip title="Delete" placement="bottom">
							<Button
								type="primary"
								danger
								size="small"
								icon={<AiOutlineDelete />}
							/>
						</Tooltip>
					</Popconfirm>
				</>
			),
		},
	];

	React.useEffect(() => {
		dispatch(bannerActions.getBannerListFetch({}));
		dispatch(metaActions.getMetaListNewBannerFetch({}));
	}, [dispatch]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection: TableRowSelection<Banner> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
		],
	};

	const handleDeleteMany = () => {
		// dispatch(
		// 	productActions.deleteManyProductFetch({
		// 		listId: selectedRowKeys,
		// 		dispatch,
		// 		accessToken,
		// 	})
		// );
	};
	const handleSearch = (value: string) => {
		if (value) {
			dispatch(bannerActions.getBannerListSearchFetch({ q: value }));
		}
	};

	return (
		<Paper>
			<div className={cx("buttons")}>
				<div>
					<Tooltip title="New product">
						<Button
							type="primary"
							onClick={() => {
								setOpenModal(true);
								dispatch(bannerActions.getCurrentBanner(null));
							}}
						>
							New
						</Button>
					</Tooltip>
					<Tooltip title="Delete selected category types">
						<Button
							type="primary"
							disabled={selectedRowKeys.length === 0}
							danger
							onClick={handleDeleteMany}
						>
							Delete
						</Button>
					</Tooltip>
					<Tooltip title="View all category types">
						<Button
							type="default"
							disabled={bannerList.listSearch.length === 0}
							onClick={() =>
								dispatch(
									bannerActions.getBannerListSearchSuccess([])
								)
							}
						>
							View All
						</Button>
					</Tooltip>
				</div>
				<div>
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
				dataSource={(bannerList.listSearch.length === 0
					? bannerList.list
					: bannerList.listSearch
				).map((item: Banner, index: number) => ({
					...item,
					key: item.id,
				}))}
				pagination={false}
				loading={bannerList.isLoading}
				size="small"
				columns={columns}
			/>
			{openModal && (
				<ModalBanner
					cx={cx}
					visible={openModal}
					onCancel={() => setOpenModal(false)}
				/>
			)}
		</Paper>
	);
};
export default BannerList;
