import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import "swiper/css";
import Loading from "~/components/Loading";
import { store } from "~/redux/store";
import "~/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const [state, setState] = useState({
		isRouteChanging: false,
		loadingKey: 0,
	});

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setState((prevState) => ({
				...prevState,
				isRouteChanging: true,
				loadingKey: prevState.loadingKey ^ 1,
			}));
		};

		const handleRouteChangeEnd = () => {
			setState((prevState) => ({
				...prevState,
				isRouteChanging: false,
			}));
		};

		router.events.on("routeChangeStart", handleRouteChangeStart);
		router.events.on("routeChangeComplete", handleRouteChangeEnd);
		router.events.on("routeChangeError", handleRouteChangeEnd);

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart);
			router.events.off("routeChangeComplete", handleRouteChangeEnd);
			router.events.off("routeChangeError", handleRouteChangeEnd);
		};
	}, [router.events]);

	return (
		<RecoilRoot>
			<Provider store={store}>
				<>
					<Loading
						isRouteChanging={state.isRouteChanging}
						key={state.loadingKey}
					/>
					<Component {...pageProps} />
				</>
			</Provider>
		</RecoilRoot>
	);
}

export default MyApp;
