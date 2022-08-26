import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import classNames from "classnames/bind";
import styles from "./ScrollToTop.module.scss";
interface Props {}
const cx: Function = classNames.bind(styles);
const ScrollToTop: React.FC<Props> = (props: Props) => {
	const [visible, setVisible] = React.useState<boolean>(false);

	const handleScroll = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	React.useEffect(() => {
		window.addEventListener("scroll", function () {
			setVisible((prev) => window.scrollY > 0);
		});
		return () => window.removeEventListener("scroll", function () {});
	}, []);

	if (!visible) return <></>;

	return (
		<button className={cx("scroll-to-top-btn")} onClick={handleScroll}>
			<AiOutlineArrowUp />
		</button>
	);
};
export default ScrollToTop;
