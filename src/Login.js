import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { provider, auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

const Login = () => {
	const [{}, dispatch] = useStateValue();
	const handleSignIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.SET_USER,
					// result is an object
					user: result.user,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png"
					alt="whatsapp logo"
				/>
				<div className="login__text">
					<h1>Login to whatsapp</h1>
				</div>
				<Button onClick={handleSignIn}>Sign in with Google</Button>
			</div>
		</div>
	);
};

export default Login;
