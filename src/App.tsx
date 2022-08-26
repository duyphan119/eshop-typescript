import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteType } from "routes";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authState } from "redux/slice/auth.slice";
import NotFound from "pages/NotFound";
import ScrollToTop from "components/ScrollToTop";

const App: React.FC = () => {
	const { accessToken } = useSelector(authState);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (accessToken) {
			dispatch(authActions.getMeFetch({ dispatch, accessToken }));
		}
	}, [dispatch, accessToken]);

	function showRoutes(routes: RouteType[]): React.ReactElement {
		return (
			<Routes>
				{routes.map((route: RouteType, index: number): React.ReactElement => {
					let Layout = route.layout;

					const Page = route.element;

					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<React.Suspense fallback={<Loading />}>
			<ScrollToTop />
			{showRoutes([...publicRoutes, ...privateRoutes])}
		</React.Suspense>
	);
};

export default App;
