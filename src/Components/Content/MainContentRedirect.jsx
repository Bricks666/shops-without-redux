import { Redirect } from "react-router";

export const MainContentRedirect = (props) => {
	switch (props.role) {
		case 1: {
			return <Redirect to="/buyer" />;
		}
		case 2: {
			return <Redirect to="/salesman" />;
		}
		case 3: {
			return <Redirect to="/admin" />;
		}
		default: {
			return "";
		}
	}
};
