import { FC, memo } from "react";
import { ProductOption } from "~/types/productOption";
import { Variant } from "~/types/variant";
import { VariantValue } from "~/types/variantValue";
import styles from "./styles.module.scss";

interface VariantProps {
	variants: Variant[];
	option: ProductOption | undefined;
	onSelectVariantValue: Function;
}

const Variants: FC<VariantProps> = ({
	variants,
	option,
	onSelectVariantValue,
}: VariantProps) => {
	const getSelectedVariantValue = (variant: Variant) => {
		const result: VariantValue | undefined = option?.variantValues?.find(
			(item: VariantValue) => item?.variant?.id === variant.id
		);
		return result?.name;
	};

	return (
		<>
			{variants.map((variant: Variant, index1: number) => {
				if (variant.name === "") return "";
				return (
					<div
						className={styles["select-option-wrapper"]}
						key={index1}
					>
						<div className={styles["option-result"]}>
							{variant.name}:{" "}
							<span>{getSelectedVariantValue(variant)}</span>
						</div>
						<ul className={styles["option-list"]}>
							{variant.variantValues?.map(
								(
									variantValue: VariantValue,
									index2: number
								) => {
									return (
										<li
											key={index2}
											className={
												option?.variantValues?.findIndex(
													(item: VariantValue) =>
														item.id ===
														variantValue.id
												) !== -1
													? styles.active
													: ""
											}
											onClick={() =>
												onSelectVariantValue(
													variantValue
												)
											}
										>
											{variantValue.name}
										</li>
									);
								}
							)}
						</ul>
					</div>
				);
			})}
			<div className={styles.status}>
				<span>Tình trạng: </span>
				{option &&
					(option.amount > 0 ? (
						<span>{option.title} - Còn hàng</span>
					) : (
						<span className={styles["in-stock"]}>
							{option.title} - Hết hàng
						</span>
					))}
			</div>
		</>
	);
};

export default memo(Variants);
