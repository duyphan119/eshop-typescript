import { Col, Row } from "antd";
import ProductCard from "components/ProductCard";
import { ProductUser } from "interfaces/productUser";
import React from "react";
import { useSelector } from "react-redux";
import { wishlistState } from "redux/slice/wishlist";

interface Props {}
const Wishlist: React.FC<Props> = (props: Props) => {
	const { wishlist } = useSelector(wishlistState);

	return (
		<Row gutter={[16, 16]}>
			{wishlist.items.map((item: ProductUser) => {
				if (!item.product) return <></>;
				return (
					<Col xs={8} key={item.productId}>
						<ProductCard product={item.product} />
					</Col>
				);
			})}
		</Row>
	);
};
export default Wishlist;
