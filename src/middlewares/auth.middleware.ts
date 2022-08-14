import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";

export const getUser: any = (req: Request, res: Response, next: NextFunction) => {
	const reqHeader = req.headers["authorization"];

	if (reqHeader) {
		const accessToken = reqHeader.split(" ")[1];
		if (accessToken) {
			try {
				const jwtPayload = jwt.verify(accessToken, AuthService.accessTokenSecret);
				res.locals.jwtPayload = jwtPayload;
			} catch (error) {}
		}
	}
	next();
};

export const requireLogin: any = (req: Request, res: Response, next: NextFunction) => {
	const reqHeader = req.headers["authorization"];

	if (reqHeader) {
		const accessToken = reqHeader.split(" ")[1];
		if (accessToken) {
			try {
				const jwtPayload = jwt.verify(accessToken, AuthService.accessTokenSecret);
				res.locals.jwtPayload = jwtPayload;
				next();
				return;
			} catch (error) {}
		}
	}
	return res.status(401).json({ code: 2, message: "Unauthorized" });
};

export const requireIsAdmin: any = (req: Request, res: Response, next: NextFunction) => {
	requireLogin(req, res, () => {
		if (
			res.locals.jwtPayload.roles.findIndex((item: any) => {
				if (item.role?.name === "ADMIN") {
					return true;
				}
				return false;
			}) !== -1
		) {
			next();
		} else {
			return res.status(401).json({ code: 2, message: "Unauthorized" });
		}
	});
};

export const requireIsUser: any = (req: Request, res: Response, next: NextFunction) => {
	requireLogin(req, res, () => {
		if (
			res.locals.jwtPayload.roles.findIndex((item: any) => {
				if (item.role?.name === "CUSTOMER") {
					return true;
				}
				return false;
			}) !== -1
		) {
			next();
		} else {
			return res.status(401).json({ code: 2, message: "Unauthorized" });
		}
	});
};
