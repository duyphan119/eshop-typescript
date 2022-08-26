import { object, optional, string } from "superstruct";

export const GetDistrictsValidation = object({
	province_id: optional(string()),
});

export const GetWardsValidation = object({
	district_id: optional(string()),
});

export const GetServicesValidation = object({
	from_district: optional(string()),
	to_district: optional(string()),
});

export const CalculateFeeValidation = object({
	weight: optional(string()),
	to_district_id: optional(string()),
	to_ward_code: optional(string()),
	insurance_value: optional(string()),
});
