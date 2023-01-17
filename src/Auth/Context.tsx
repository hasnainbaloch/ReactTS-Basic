import React, { useState } from "react";

interface AuthContextData {
	isAuthenticated: boolean;
	roles: string[];
	login: (roles: string[]) => void;
	logout: () => void;
}

interface Props {
	children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [roles, setRoles] = useState<string[]>([]);

	const login = (userRoles: string[]) => {
		setIsAuthenticated(true);
		setRoles(userRoles);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setRoles([]);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, roles, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
