export interface QueryParams {
	limit?: number;
	p?: number;
	sortBy?: string;
	sortType?: string;
	all?: boolean;
}

export interface ProvinceVN {
	code: number;
	codename: string;
	division_type: string;
	name: string;
}
export interface City extends ProvinceVN {
	phone_code: number;
	districts?: District[];
}

export interface District extends ProvinceVN {
	short_codename: string;
	wards?: Ward[];
}
export interface Ward extends ProvinceVN {
	short_codename: string;
}
