import axios, { AxiosResponse } from "axios";
import { CalculateFeeValidation, GetDistrictsValidation, GetServicesValidation, GetWardsValidation } from "../validation/shipping.validation";
import { assert } from "superstruct";
import { CalculateFeeDTO, GetDistrictsDTO, GetServicesDTO, GetWardsDTO } from "../dto/shipping.dto";
const instance = axios.create({
	headers: {
		token: process.env.GHN_TOKEN || "",
	},
	baseURL: "https://online-gateway.ghn.vn/shiip/public-api/",
});

class ShippingService {
	static async getProvinces(): Promise<AxiosResponse> {
		return instance.get(`master-data/province`);
	}

	static async getDistricts(queryParams: GetDistrictsDTO): Promise<AxiosResponse> {
		assert(queryParams, GetDistrictsValidation);
		return instance.get(`master-data/district`, {
			params: {
				...(queryParams.province_id ? { province_id: queryParams.province_id } : ""),
			},
		});
	}

	static async getWards(queryParams: GetWardsDTO): Promise<AxiosResponse> {
		assert(queryParams, GetWardsValidation);
		return instance.get(`master-data/ward`, {
			params: {
				...(queryParams.district_id ? { district_id: queryParams.district_id } : ""),
			},
		});
	}

	static async getServices(queryParams: GetServicesDTO): Promise<AxiosResponse> {
		assert(queryParams, GetServicesValidation);
		return instance.get(`v2/shipping-order/available-services`, {
			params: {
				shop_id: process.env.GHN_SHOP_ID,
				from_district: queryParams.from_district,
				to_district: queryParams.to_district,
			},
		});
	}

	static async calculateFee(queryParams: CalculateFeeDTO): Promise<AxiosResponse> {
		assert(queryParams, CalculateFeeValidation);
		const res = await this.getServices({
			from_district: process.env.GHN_DISTRICT_ID || "1",
			to_district: queryParams.to_district_id,
		});

		return instance.get(`v2/shipping-order/fee`, {
			params: {
				shop_id: process.env.GHN_SHOP_ID,
				from_district_id: process.env.GHN_DISTRICT_ID,
				service_id: res.data.data[0].service_id,
				weight: queryParams.weight,
				to_district_id: queryParams.to_district_id,
				to_ward_code: queryParams.to_ward_code,
				insurance_value: queryParams.insurance_value,
			},
		});
	}
}

export default ShippingService;
