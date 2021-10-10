import { Redirect } from "react-router";

export const MainContentRedirect = (props) => {

	return props.role === 1 ? <Redirect to="/shops" /> : "";
};
