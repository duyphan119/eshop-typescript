import { routes, RoutesType } from "./routes";
import { TitlePageType, titles } from "./titles";

interface ConfigsType {
	routes: RoutesType;
	titles: TitlePageType;
}

const config: ConfigsType = {
	routes,
	titles,
};
export default config;
