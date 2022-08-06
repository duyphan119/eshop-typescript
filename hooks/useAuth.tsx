import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "~/types/user";
import * as authApi from "~/api/authApi";
import config from "~/config";

interface IAuth {
	user: User | null;
	register: (
		email: string,
		password: string,
		fullName: string
	) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
	loading: boolean;
	accessToken: string | null;
}
const AuthContext = createContext<IAuth>({
	user: null,
	register: async () => {},
	login: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
	accessToken: null,
});
interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {}, []);

	const register = async (
		email: string,
		password: string,
		fullName: string
	) => {
		setLoading(true);
		authApi
			.register({ email, password, fullName })
			.then((res) => {
				setUser(res.data.user);
				setAccessToken(res.data.accessToken);
				router.push(config.routes.home);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const logout = async () => {
		setLoading(true);
		authApi
			.logout()
			.then(() => {
				setUser(null);
				setAccessToken(null);
				router.push(config.routes.login);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const login = async (email: string, password: string) => {
		authApi
			.login({ email, password })
			.then((res) => {
				setUser(res.data.user);
				setAccessToken(res.data.accessToken);
				router.push(config.routes.home);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const memoedValue = useMemo(
		() => ({ user, register, login, error, loading, logout, accessToken }),
		[user, loading, error, accessToken]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{children}
		</AuthContext.Provider>
	);
};
export default function useAuth() {
	return useContext(AuthContext);
}
