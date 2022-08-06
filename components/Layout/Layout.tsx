import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as authApi from "~/lib/api/authApi";
import { authActions } from "~/redux/slices/authSlice";
import { getToken } from "~/utils";

const Layout = ({ children }: any) => {
	const token = getToken();
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(token);
		if (token)
			(async () => {
				try {
					dispatch(authActions.fetch());
					const res = await authApi.getProfile(token);
					if (res.status === 200) {
						dispatch(authActions.getProfile(res.data));
					}
				} catch (error) {
					dispatch(authActions.error());
				}
			})();
	}, [token]);
	return children;
};

export default Layout;
