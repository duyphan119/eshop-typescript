import { ProductOption } from "interfaces/productOption";
import { ProductOptionValue } from "interfaces/productOptionValue";
import { Variant } from "interfaces/variant";
import { VariantValue } from "interfaces/variantValue";
import React from "react";

interface Props {
	cx: Function;
	variants: Variant[];
	option: ProductOption | undefined;
	onSelectVariantValue: Function;
}

const Variants: React.FC<Props> = (props: Props) => {
	const { variants, cx, option, onSelectVariantValue } = props;
	const getSelectedVariantValue = (variant: Variant) => {
		const result: ProductOptionValue | undefined = option?.variantValues?.find((item: ProductOptionValue) => item.variantValue?.variant?.id === variant.id);
		return result?.variantValue?.name;
	};
	return (
		<>
			{variants.map((variant: Variant, index1: number) => {
				if (variant.name === "") return "";
				return (
					<div className={cx("select-option-wrapper")} key={index1}>
						<div className={cx("option-result")}>
							{variant.name}: <span>{getSelectedVariantValue(variant)}</span>
						</div>
						<ul className={cx("option-list")}>
							{variant.variantValues?.map((variantValue: VariantValue, index2: number) => {
								return (
									<li
										key={index2}
										className={
											option?.variantValues?.findIndex((item: ProductOptionValue) => item.variantValueId === variantValue.id) !== -1
												? cx("active")
												: ""
										}
										onClick={() => onSelectVariantValue(variantValue)}
									>
										{variantValue.name}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</>
	);
};

export default React.memo(Variants);
