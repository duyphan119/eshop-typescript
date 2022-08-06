import { createContext } from "react";
import { Category } from "~/types/category";
interface AppContextInterface {
	categories: Category[];
}
const AppContext = createContext<AppContextInterface | null>(null);

export default AppContext;
