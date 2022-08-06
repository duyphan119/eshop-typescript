import { useState } from "react";
import * as categoryApi from "~/lib/api/categoryApi";
import { Category } from "~/types/category";
const useApp = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	const getCategories = async () => {
		console.log("object");
		try {
			const res = await categoryApi.getCategories({
				all: true,
				level: 1,
				depth: 3,
			});
			if (res && res.status === 200) {
				setCategories(res.data.items);
			}
		} catch (error) {}
	};

	return { getCategories, categories };
};

export default useApp;
