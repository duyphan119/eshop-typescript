import { Tooltip } from "antd";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchWrapper from "../SearchWrapper";

interface Props {
	cx: Function;
}

const SearchIcon: React.FC<Props> = (props: Props) => {
	const { cx } = props;

	const [open, setOpen] = React.useState<boolean>(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<React.Fragment>
			<Tooltip title="Search products">
				<span className={cx("icon-item")} onClick={handleOpen}>
					<AiOutlineSearch />
				</span>
			</Tooltip>
			{open && <SearchWrapper cx={cx} />}
		</React.Fragment>
	);
};

export default React.memo(SearchIcon);
