import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

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

import axios from "axios";

import { useForm, SubmitHandler } from "react-hook-form";

enum RoleEnum {
	Manager = "Manager",
	HR = "HR",
	Developer = "Developer",
}

interface IFormInput {
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	role: RoleEnum;
}

export default function SignUp({ setHasAccount }: { setHasAccount: Function }) {
	const [role, setRole] = React.useState<RoleEnum>(RoleEnum.Manager);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		axios.post("http://localhost:8000/auth/signup", data).then((res: any) => {
			console.log({res});
		});
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
				Sign up
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								{...register("first_name", {
									required: true,
									maxLength: 20,
								})}
								autoComplete="first_name"
								name="first_name"
								required
								fullWidth
								id="first_name"
								label="First Name"
								autoFocus
								error={errors.first_name ? true : false}
							/>
							<FormHelperText>
								{errors.first_name?.type === "required" && (
									<p role="alert">First name is required</p>
								)}
							</FormHelperText>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								{...register("last_name", {
									required: true,
									maxLength: 20,
								})}
								required
								fullWidth
								id="last_name"
								label="Last Name"
								name="last_name"
								autoComplete="last_name"
							/>
							<FormHelperText>
								{errors.last_name?.type === "required" && (
									<p role="alert">First name is required</p>
								)}
							</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register("email")}
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
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
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="role-select-label">Role</InputLabel>
								<Select
									{...register("role")}
									labelId="role-select-label"
									id="role-select"
									value={role}
									label="Role"
									onChange={(e) => {
										setRole(e.target.value as RoleEnum);
									}}
									defaultValue={RoleEnum.Manager}
								>
									<MenuItem value={"Manager"}>Manager</MenuItem>
									<MenuItem value={"HR"}>HR</MenuItem>
									<MenuItem value={"Developer"}>Developer</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						{/* <Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link
								href="#"
								variant="body2"
								onClick={() => setHasAccount(true)}
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</form>
		</Box>
	);
}
