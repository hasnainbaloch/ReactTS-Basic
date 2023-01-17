import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Auth/Context";




export const HR = () => {
	const auth = useContext(AuthContext);
	return (
		<>
			<h1>HR {auth.roles[0]}</h1>
			<Outlet />
		</>
	);
};
