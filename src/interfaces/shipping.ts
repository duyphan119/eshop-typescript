export type GetDistricts = {
	province_id?: string;
};

export type GetWards = {
	district_id?: string;
};

export type GetServices = {
	from_district?: string;
	to_district?: string;
};

export type CalculateFee = {
	weight?: string;
	to_district_id?: string;
	to_ward_code?: string;
	insurance_value?: string;
};
