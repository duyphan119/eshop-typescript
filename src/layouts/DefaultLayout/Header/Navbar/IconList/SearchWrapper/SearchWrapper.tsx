import config from "config";
import { Product } from "interfaces/product";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productState } from "redux/slice/product.slice";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
interface Props {
	cx: Function;
}
const SearchWrapper: React.FC<Props> = (props: Props) => {
	const { cx } = props;

	const { previewSearchResults } = useSelector(productState);

	const [q, setQ] = React.useState<string>("");

	return (
		<div className={cx("search-wrapper")}>
			<div className={cx("search-bar")} onClick={(e) => e.stopPropagation()}>
				<SearchInput q={q} setQ={setQ} />
				<ul className={cx("search-results")}>
					{[...previewSearchResults.list].splice(0, 5).map((item: Product, index: number) => {
						return <SearchResult cx={cx} item={item} key={index} />;
					})}
					{previewSearchResults.list.length > 5 && (
						<li className={cx("view-all")}>
							<Link to={`${config.routes.productSearch}?q=${q}`}>View all</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default React.memo(SearchWrapper);
