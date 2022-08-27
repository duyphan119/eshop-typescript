import { getAllPaymentMethod } from "api/paymentMethodApi";
import { PaymentMethod } from "interfaces/paymentMethod";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { OrderInfoInputs } from "../Cart";
interface Props {
	register: UseFormRegister<OrderInfoInputs>;
}
const PaymentMethodRadios: React.FC<Props> = ({ register }: Props) => {
	const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);

	React.useEffect(() => {
		(async () => {
			try {
				const res = await getAllPaymentMethod({ sortType: "asc" });
				const { code, data } = res.data;
				if (code === 1) {
					setPaymentMethods(data.items);
				}
			} catch (error) {}
		})();
	}, []);

	return (
		<>
			{paymentMethods.map((paymentMethod: PaymentMethod) => {
				return (
					<div
						key={paymentMethod.id}
						style={{ padding: "8px 12px", border: "1px solid #000", display: "flex", alignItems: "center", borderRadius: "2px" }}
					>
						<input
							{...register("paymentMethodId")}
							style={{ transform: "translateY(1px)" }}
							type="radio"
							value={paymentMethod.id}
							name="paymentMethodId"
							id={"pm" + paymentMethod.id}
						/>
						<label htmlFor={"pm" + paymentMethod.id} style={{ marginLeft: 12 }}>
							{paymentMethod.name}
						</label>
					</div>
				);
			})}
		</>
	);
};
export default PaymentMethodRadios;
