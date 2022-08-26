import { Form, Radio } from "antd";
import { getAllPaymentMethod } from "api/paymentMethodApi";
import { PaymentMethod } from "interfaces/paymentMethod";
import React from "react";
interface Props {}
const PaymentMethodRadios: React.FC<Props> = (props: Props) => {
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
			<Form.Item name="paymentMethodId">
				<Radio.Group style={{ width: "100%" }}>
					{paymentMethods.map((paymentMethod: PaymentMethod, index: number) => {
						return (
							<Radio
								value={paymentMethod.id}
								key={paymentMethod.id}
								style={{
									display: "flex",
									border: "1px solid gray",
									width: "100%",
									padding: "6px 12px",
									marginTop: index === 0 ? 0 : 8,
								}}
							>
								{paymentMethod.name}
							</Radio>
						);
					})}
				</Radio.Group>
			</Form.Item>
		</>
	);
};
export default PaymentMethodRadios;
