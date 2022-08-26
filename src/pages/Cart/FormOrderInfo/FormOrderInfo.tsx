import { Form, Input, Select } from "antd";
import { getCities, getDistricts, getFee, getWards } from "api/shippingApi";
import { CartItem } from "interfaces/cartItem";
import React from "react";
import { useSelector } from "react-redux";
import { cartState } from "redux/slice/cart";
interface Props {}

enum ActionKind {
	GET_CITIES = "GET_CITIES",
	GET_DISTRICTS = "GET_DISTRICTS",
	GET_WARDS = "GET_WARDS",
	SET_FEE = "SET_FEE",
}
interface Action {
	type: ActionKind;
	payload: any;
}

interface InitState {
	cities: any;
	districts: any;
	wards: any;
	fee: number;
}

const initState: InitState = {
	cities: [],
	districts: [],
	wards: [],
	fee: 0,
};

const reducer = (state: InitState, action: Action) => {
	const { type, payload } = action;
	switch (type) {
		default:
			return {
				...state,
				...payload,
			};
	}
};

interface Props {
	onGetFee: Function;
}

const FormOrderInfo: React.FC<Props> = ({ onGetFee }: Props) => {
	const [state, dispatch] = React.useReducer(reducer, initState);
	const { cities, districts, wards } = state;
	const { cartItems } = useSelector(cartState);
	console.log("state", state);

	React.useEffect(() => {
		(async () => {
			try {
				const res = await getCities();
				const { code, data } = res.data;
				if (code === 1) {
					dispatch({ type: ActionKind.GET_CITIES, payload: { cities: data } });
				}
			} catch (error) {}
		})();
	}, []);

	const handleChangeCity = (value: any) => {
		const province = cities.find((item: any) => item.ProvinceName === value);
		if (province) {
			(async () => {
				try {
					const res = await getDistricts({
						province_id: province.ProvinceID,
					});
					const { code, data } = res.data;
					if (code === 1) {
						dispatch({ type: ActionKind.GET_DISTRICTS, payload: { districts: data } });
					}
				} catch (error) {}
			})();
		} else {
			dispatch({ type: ActionKind.GET_DISTRICTS, payload: { districts: [] } });
		}
	};

	const handleChangeDistrict = (value: any) => {
		const district = districts.find((item: any) => item.DistrictName === value);
		if (district) {
			(async () => {
				try {
					const res = await getWards({
						district_id: district.DistrictID,
					});
					const { code, data } = res.data;
					if (code === 1) {
						dispatch({ type: ActionKind.GET_WARDS, payload: { wards: data } });
					}
				} catch (error) {}
			})();
		} else {
			dispatch({ type: ActionKind.GET_WARDS, payload: { wards: [] } });
		}
	};

	const handleChangeWard = (value: any) => {
		let weight = 0;
		let insurance_value = 0;
		cartItems.forEach((item: CartItem) => {
			if (item.productOption) weight += item.productOption.weight * item.quantity;
			if (item.productOption && item.productOption.product)
				insurance_value += (item.productOption.product.newPrice || item.productOption.product.price) * item.quantity;
		});
		if (insurance_value < 500000) {
			const ward = wards.find((item: any) => item.WardName === value);
			if (ward) {
				(async () => {
					try {
						const res = await getFee({
							to_district_id: "" + ward.DistrictID,
							to_ward_code: ward.WardCode,
							weight: "" + weight,
							insurance_value: "" + insurance_value,
						});
						const { code, data } = res.data;
						if (code === 1) {
							const fee = Math.floor(data.data.insurance_fee / 1000) * 1000 + 15000;
							onGetFee(fee);
							dispatch({ type: ActionKind.SET_FEE, payload: { fee } });
						}
					} catch (error) {}
				})();
			}
		}
	};

	return (
		<>
			<Form.Item name="fullName">
				<Input placeholder="Họ tên" />
			</Form.Item>
			<Form.Item name="phone">
				<Input placeholder="Số điện thoại" />
			</Form.Item>
			<Form.Item name="city">
				<Select onChange={handleChangeCity}>
					<Select.Option value="">Tỉnh / Thành phố</Select.Option>
					{cities.map((item: any) => {
						return (
							<Select.Option value={item.ProvinceName} key={item.ProvinceID}>
								{item.ProvinceName}
							</Select.Option>
						);
					})}
				</Select>
			</Form.Item>
			<Form.Item name="district">
				<Select onChange={handleChangeDistrict}>
					<Select.Option value="">Quận / Huyện</Select.Option>
					{districts.map((item: any) => {
						return (
							<Select.Option value={item.DistrictName} key={item.DistrictID}>
								{item.DistrictName}
							</Select.Option>
						);
					})}
				</Select>
			</Form.Item>
			<Form.Item name="ward">
				<Select onChange={handleChangeWard}>
					<Select.Option value="">Phường / Xã</Select.Option>
					{wards.map((item: any) => {
						return (
							<Select.Option value={item.WardName} key={item.WardCode}>
								{item.WardName}
							</Select.Option>
						);
					})}
				</Select>
			</Form.Item>
			<Form.Item name="address">
				<Input placeholder="Địa chỉ" />
			</Form.Item>
		</>
	);
};
export default FormOrderInfo;
