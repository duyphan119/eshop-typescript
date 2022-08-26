export type GetDistrictsDTO = {
	province_id?: string;
};

export type GetWardsDTO = {
	district_id?: string;
};

export type GetServicesDTO = {
	from_district?: string;
	to_district?: string;
};

export type CalculateFeeDTO = {
	weight?: string;
	to_district_id?: string;
	to_ward_code?: string;
	insurance_value?: string;
};
