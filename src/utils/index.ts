import jwtDecode from "jwt-decode";
import { API } from "constant";

export const decodeToken = (token: string | undefined | null): any => {
	if (!token) return null;

	return jwtDecode(token);
};
export const getURL = (path: string | null | undefined): string => {
	if (!path) return "";

	if (path.includes("http")) {
		return path;
	}

	const baseUrl = API.BASE_URL.endsWith("/") ? API.BASE_URL : API.BASE_URL + "/";

	return baseUrl + path;
};
export const formatPrice = (price: number | null | undefined): string => {
	if (!price) return "";

	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
export const toSlug = (str: string): string => {
	if (!str) return "";
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();

	// xóa dấu
	str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
	str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
	str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
	str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
	str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
	str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
	str = str.replace(/(đ)/g, "d");

	str = str.replace(/(\s+-\s+)/g, "-");

	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, "");

	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, "-");

	// xóa phần dự - ở đầu
	str = str.replace(/^-+/g, "");

	// xóa phần dư - ở cuối
	str = str.replace(/-+$/g, "");

	// return
	return str;
};

export const fromNow = (date: string | number | Date): string => {
	const created = new Date(date).getTime();
	let periods: any = {
		year: 12 * 30 * 24 * 60 * 60 * 1000,
		month: 30 * 24 * 60 * 60 * 1000,
		week: 7 * 24 * 60 * 60 * 1000,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000,
	};
	let diff = Date.now() - created;

	for (const key in periods) {
		if (diff >= periods[key]) {
			let result = Math.floor(diff / periods[key]);
			return `${result} ${key}${result > 1 ? "s" : ""} ago`;
		}
	}

	return "Just now";
};

export const formatDate = (input: string | number | Date): string => {
	try {
		const date = new Date(input);
		const yyyy = date.getFullYear();
		const MM = date.getMonth() + 1;
		const dd = date.getDate();
		return `${dd < 10 ? "0" + dd : dd}-${MM < 10 ? "0" + MM : MM}-${yyyy}`;
	} catch (error) {}
	return "" + input;
};
export const formatTime = (input: string | number | Date): string => {
	try {
		const date = new Date(input);
		const hh = date.getHours();
		const mm = date.getMinutes();
		const ss = date.getSeconds();
		return `${hh < 10 ? "0" + hh : hh}:${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
	} catch (error) {}
	return "" + input;
};
export const formatDateTime = (input: string | number | Date): string => {
	try {
		return formatDate(input) + " " + formatTime(input);
	} catch (error) {}
	return "" + input;
};
