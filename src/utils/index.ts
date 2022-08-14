import { Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";

export const generateIncludeParentCategory = (depth: number): any => {
	const result: any = {};
	let check = result;
	let ngu;
	let i = 1;
	while (i >= 1 && i <= depth) {
		check.include = {
			parent: i === depth ? true : {},
		};
		ngu = check.include.parent;
		if (i !== depth) {
			check = ngu;
		}
		i++;
	}
	return result;
};

export const generateIncludeChildrenCategory = (depth: number): any => {
	if (isNaN(depth)) return {};
	if (depth < 1) return {};
	let result: any = {};
	let check = result;
	let ngu;
	let i = 1;
	while (i >= 1 && i <= depth) {
		check.include = {
			categoryType: true,
			parent: generateIncludeParentCategory(depth - 1),
			children: i === depth ? true : { orderBy: [{ id: "asc" }] },
		};
		ngu = check.include.children;
		if (i !== depth) {
			check = ngu;
		}
		i++;
	}

	return result.include;
};

export const catchErrorResponse = (res: Response, error: any) => {
	console.log(error);
	return res.status(STATUS_CODE.ERROR).json({
		code: CODE_RESPONSE.ERROR,
		message: MESSAGE_RESPONSE.ERROR,
		data: error,
	});
};
