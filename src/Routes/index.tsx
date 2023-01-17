import { createBrowserRouter } from "react-router-dom";
import { MainDashboard } from "../Pages/Dashboard/Dashboard";
import { PrivateRoute } from "./Private";
import { Auth as Authentication } from "../Auth";

export const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: (
			<PrivateRoute
				component={MainDashboard}
				roles={["Developer", "Manager", "HR"]}
			/>
		),
	},
	{
		path: "/hr",
		element: (
			<PrivateRoute
				component={MainDashboard}
				roles={["HR"]}
			/>
		),
	},
	{
		path: "/",
		element: <Authentication />,
	},
]);
