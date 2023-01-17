import React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "./LoginComponent";
import SignUp from "./SignUpComponent";
import { Link, Typography } from "@mui/material";

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

export const Auth = () => {
	const [hasAccount, setHasAccount] = React.useState(true);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{hasAccount ? (
					<Login setHasAccount={setHasAccount} />
				) : (
					<SignUp setHasAccount={setHasAccount} />
				)}
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
};
