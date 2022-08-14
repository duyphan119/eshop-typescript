import { Router, Request, Response } from "express";
import cloudinary from "cloudinary";
import { mkdirSync, unlink } from "fs";
import multer from "multer";
import { extname } from "path";
import { promisify } from "util";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
const storage = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
		const date = new Date();
		const year = date.getFullYear().toString().substring(2);
		const month: string = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
		const day: string = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
		const path: string = `./public/images/${year}${month}${day}`;
		mkdirSync(path, { recursive: true });

		cb(null, path);
	},
	filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
		const ext = extname(file.originalname);
		cb(null, file.originalname.split(ext)[0] + new Date().getTime() + ext);
	},
});

const upload = multer({ storage: storage });
const cloud_name = "dwhjftwvw";
const api_key = "335652142568654";
const api_secret = "rVXHGRE29TukCR3eUxZEyJlv3ME";

const router = Router();
router.post("/user", upload.single("file"), async (req: Request, res: Response) => {
	cloudinary.v2.config({
		api_key,
		api_secret,
		cloud_name,
	});
	try {
		if (req.file) {
			const img = await cloudinary.v2.uploader.upload(req.file.path, {
				folder: "canifa/avatar",
			});
			const unlinkAsync = promisify(unlink);
			const path = __dirname.split("src")[0];
			console.log({ __dirname, path, filePath: req.file.path });
			await unlinkAsync(path + req.file.path);
			return res.status(200).json(img.secure_url);
		}
	} catch (error) {
		console.log(error);
	}
	return res.status(200).json("");
});

router.post("/category", upload.single("file"), async (req: Request, res: Response) => {
	cloudinary.v2.config({
		api_key,
		api_secret,
		cloud_name,
	});
	try {
		if (req.file) {
			const img = await cloudinary.v2.uploader.upload(req.file.path, {
				folder: "canifa/category",
			});
			const unlinkAsync = promisify(unlink);
			const path = __dirname.split("src")[0];
			console.log({ __dirname, path, filePath: req.file.path });
			await unlinkAsync(path + req.file.path);
			return res.status(200).json(img.secure_url);
		}
	} catch (error) {
		console.log(error);
	}
	return res.status(200).json("");
});

export default router;
