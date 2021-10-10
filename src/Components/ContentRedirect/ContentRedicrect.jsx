import { Redirect } from "react-router";

export const ContentRedirect = (props) => {
	console.log(props);
	return props.isRegistration ? (
		<Redirect from="/registration" to="/login" />
	) : props.isLogin ? (
		<Redirect from="/login" to="/" />
	) : props.isUnlock ? (
		<Redirect from="/unlock" to="/login" />
	) : (
		<Redirect to="/unlock" />
	);
};
