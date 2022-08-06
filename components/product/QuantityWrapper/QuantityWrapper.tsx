import { FC, memo } from "react";
import styles from "./styles.module.scss";
interface QuantityWrapperProps {
	quantity: number;
	onChangeQuantity: Function;
}

const QuantityWrapper: FC<QuantityWrapperProps> = ({
	quantity,
	onChangeQuantity,
}: QuantityWrapperProps) => {
	return (
		<div className={styles["quantity-wrapper"]}>
			<div className={styles["quantity"]}>
				<div
					className={styles["quantity-change"]}
					onClick={() => onChangeQuantity(quantity - 1)}
				>
					-
				</div>
				<input
					value={quantity}
					onChange={(e) => onChangeQuantity(e.target.value)}
				/>
				<div
					className={styles["quantity-change"]}
					onClick={() => onChangeQuantity(quantity + 1)}
				>
					+
				</div>
			</div>
		</div>
	);
};

export default memo(QuantityWrapper);
