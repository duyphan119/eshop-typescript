import { Avatar, Space } from "antd";
import { Product } from "interfaces/product";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice, getURL } from "utils";
interface Props {
	cx: Function;
	item: Product;
}
const SearchResult: React.FC<Props> = (props: Props) => {
	const { cx, item } = props;
	return (
		<li>
			<Link to={`/product/${item.slug}`}>
				<Space>
					<Avatar
						alt=""
						src={getURL(item.thumbnail)}
						shape="square"
						style={{
							height: 60,
							width: 48,
						}}
					/>
					<Space direction="vertical">
						<span className={cx("name")}>{item.name}</span>
						<span className={cx("price")}>
							{formatPrice(item.newPrice || item.price)}₫ &nbsp;
							{item.newPrice !== 0 && (
								<span className={cx("old-price")}>
									{formatPrice(item.price)}₫
								</span>
							)}
						</span>
					</Space>
				</Space>
			</Link>
		</li>
	);
};

export default React.memo(SearchResult);
