import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Auth/Context";

export const MainDashboard = () => {
	const auth = useContext(AuthContext);
	return (
		<>
			<h1>Dashboard {auth.roles[0]}</h1>
			<Outlet />
		</>
	);
};
