import { Redirect } from "react-router";

export const ContentRedirect = (props) => {

	if (props.isUnlock === false) {
		return <Redirect to="/unlock" />;
	}

	if (props.isLogin === true) {
		return <Redirect from="/login" to="/" />;
	}
	if (props.isLogin === false) {
		return <Redirect to="/login" />;
	}

	if (props.isRegistration === true) {
		return <Redirect from="/registration" to="/login" />;
	}
};
