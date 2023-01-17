import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/Context";
// import AccessDenied from "./pages/AccessDenied";
// import { ROLE } from "./features/auth/auth";
// import {
// 	selectCurrentUser,
// 	selectIsAuthenticated,
// } from "./features/auth/authSlice";

interface Props {
	component: React.ComponentType;
	path?: string;
	roles: string[];
}

export const PrivateRoute: React.FC<Props> = ({
	component: RouteComponent,
	roles,
}) => {
	const auth = useContext(AuthContext);
	console.log("PROVATE ROUTE context", auth);

	const isAuthenticated = auth.isAuthenticated;
	const userHasRequiredRole = roles.filter((y) =>
		auth.roles.some((x) => x === y)
	)
		? true
		: false;

	if (isAuthenticated && userHasRequiredRole) {
		return <RouteComponent />;
	}

	// if (isAuthenticated && !userHasRequiredRole) {
	// 	return <AccessDenied />;
	// }

	return <Navigate to="/" />;
};
