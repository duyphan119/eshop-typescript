import config from "config";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState } from "redux/slice/auth.slice";
import { productActions } from "redux/slice/product.slice";

interface Props {
	q: string;
	setQ: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<Props> = (props: Props) => {
	const { q, setQ } = props;

	const dispatch = useDispatch();

	const inputRef = React.useRef<HTMLInputElement>(null);

	const { accessToken } = useSelector(authState);

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQ(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		!q || navigate(`${config.routes.productSearch}?q=${q}`);
	};

	React.useEffect(() => {
		if (accessToken && q !== "") {
			const timerId = setTimeout(() => {
				dispatch(
					productActions.getPreviewSearchResultsFetch({
						accessToken,
						dispatch,
						params: { q },
					})
				);
			}, 1234);

			return () => clearTimeout(timerId);
		} else {
			dispatch(productActions.getPreviewSearchResultsSuccess([]));
		}
	}, [q, dispatch, accessToken]);
	return (
		<form onSubmit={handleSubmit}>
			<span>
				<AiOutlineSearch />
			</span>
			<input ref={inputRef} placeholder="Bạn tìm gì..." value={q} onChange={handleChange} type="search" />
		</form>
	);
};

export default React.memo(SearchInput);
