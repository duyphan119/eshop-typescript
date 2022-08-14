export const STATUS_CODE = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	ERROR: 500,
};

export const CODE_RESPONSE = {
	SUCCESS: 1,
	ERROR: 2,
};

export const MESSAGE_RESPONSE = {
	SUCCESS: "Success",
	ERROR: `Something can be wrong`,
	UNAUTHORIZED: "Unauthorized",
};

export const __prod__ = process.env.NODE_ENV === "production";

export const COOKIE_REFRESH_TOKEN = "RT";
