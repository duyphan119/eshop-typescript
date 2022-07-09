import { Button, Input, Popconfirm, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import classNames from "classnames/bind";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD_LAYOUT, TABLE } from "../../constants";
import { Category } from "../../interfaces/category";
import { authState } from "../../redux/slice/auth";
import {
  categoryState,
  deleteCategoryFetch,
  deleteManyCategoryFetch,
  getCategoryListFetch,
  getCurrentCategory,
  searchCategoryFetch,
  searchCategorySuccess,
} from "../../redux/slice/category";
import styles from "./CategoryList.module.scss";
import ModalCategory from "./ModalCategory";

const cx = classNames.bind(styles);

const CategoryList = () => {
  const { isLoading, list, isLoadingDelete, listSearch, isLoadingSearch } =
    useSelector(categoryState);
  const { accessToken } = useSelector(authState);
  const columns: ColumnsType<Category> = [
    {
      title: "Tên",
      dataIndex: "title",
      sorter: (a: Category, b: Category) => a.title.length - b.title.length,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      sorter: (a: Category, b: Category) => a.sku.length - b.sku.length,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      sorter: (a: Category, b: Category) => a.slug.length - b.slug.length,
    },
    {
      title: "Danh mục cha",
      dataIndex: "parent",
      sorter: (a: Category, b: Category): any =>
        (a.parent ? a.parent.title : "Không có").length -
        (b.parent ? b.parent.title : "Không có").length,
      render: (text: string, row: Category) =>
        row.parent ? row.parent.title : "Không có",
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (text: string, row: Category) => (
        <>
          <Tooltip title="Edit">
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setOpenModal(true);
                dispatch(getCurrentCategory(row));
              }}
            >
              Sửa
            </Button>
          </Tooltip>
          &nbsp;&nbsp;
          <Popconfirm
            placement="topRight"
            title={"Bạn có chắc chắn xoá ?"}
            onConfirm={() => {
              dispatch(deleteCategoryFetch({ ...row, dispatch, accessToken }));
            }}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Delete" placement="bottom">
              <Button type="primary" danger size="small">
                Xoá
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategoryListFetch());
  }, [dispatch]);

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  React.useEffect(() => {
    setSelectedRowKeys([]);
  }, [isLoadingDelete]);

  const rowSelection: TableRowSelection<Category> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleDeleteMany = () => {
    dispatch(
      deleteManyCategoryFetch({
        listId: selectedRowKeys.map((item) => list[item].id),
        dispatch,
        accessToken,
      })
    );
  };

  const handleSearch = (value: string) => {
    dispatch(searchCategoryFetch({ q: value }));
  };

  return (
    <>
      <div
        className={cx("paper")}
        style={{ height: DASHBOARD_LAYOUT.TABLE_LIST_HEIGHT }}
      >
        <div className={cx("buttons")}>
          <div>
            <Tooltip title="New">
              <Button
                type="primary"
                onClick={() => {
                  setOpenModal(true);
                  dispatch(getCurrentCategory(null));
                }}
              >
                Thêm danh mục
              </Button>
            </Tooltip>
            <Tooltip title="Xoá">
              <Button
                type="primary"
                disabled={selectedRowKeys.length === 0}
                danger
                onClick={handleDeleteMany}
              >
                Xoá
              </Button>
            </Tooltip>
            <Tooltip title="Tất cả danh mục">
              <Button
                type="default"
                disabled={listSearch.length === 0}
                onClick={() => dispatch(searchCategorySuccess([]))}
              >
                Tất cả danh mục
              </Button>
            </Tooltip>
          </div>
          <div>
            <Input.Search
              {...{
                placeholder: "Tìm ở đây",
                allowClear: true,
                onSearch: handleSearch,
              }}
            />
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={(listSearch.length === 0 ? list : listSearch).map(
            (item: Category, index: number) => ({
              ...item,
              key: index,
            })
          )}
          pagination={{
            total: (listSearch.length === 0 ? list : listSearch).length,
            pageSize: TABLE.CATEGORY_PAGE_SIZE,
          }}
          loading={isLoading || isLoadingSearch}
          size="small"
          columns={columns}
        />
      </div>
      {openModal && (
        <ModalCategory
          visible={openModal}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default CategoryList;
