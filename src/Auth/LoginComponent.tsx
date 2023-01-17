import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "./Context";
import jwtDecode from "jwt-decode";

interface IFormInput {
	username: string;
	password: string;
}

export default function Login({ setHasAccount }: { setHasAccount: Function }) {
	// use AuthContext
	const { login } = useContext(AuthContext);

	const navigation = useNavigate();
	const auth = useContext(AuthContext);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (auth.isAuthenticated && token) {
			navigation("/dashboard");
		}
	}, []);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();

	const handleLogin: SubmitHandler<IFormInput> = ({ username, password }) => {
		// axios post request and pass FormData
		let data = new FormData();
		data.append("username", username);
		data.append("password", password);

		axios
			.post("http://localhost:8000/auth/login", data)
			.then((res: any) => {
				decodeHandler(res.data.access_token);
			})
			.catch((err: any) => {
				console.log({ err });
			});
	};

	const decodeHandler = async (data: any) => {
		const decoded: any = await jwtDecode(data);
		console.log({ first: decoded });
		login(decoded.roles); // pass roles to AuthContext
		setTimeout(() => {
			navigation("/hr"); // navigate to dashboard
		}, 0);
	};

	return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<form onSubmit={handleSubmit(handleLogin)} noValidate>
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								{...register("username")}
								required
								fullWidth
								id="username"
								label="Email"
								name="username"
								autoComplete="username"
								defaultValue={"hasnain.ali@fastapi.com"}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register("password")}
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="password"
								defaultValue={"FastApi@123123"}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link
								href="#"
								variant="body2"
								onClick={() => setHasAccount(false)}
							>
								Don't have an account? SignUp
							</Link>
						</Grid>
					</Grid>
				</Box>
			</form>
		</Box>
	);
}
