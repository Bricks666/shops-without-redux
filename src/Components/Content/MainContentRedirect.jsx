import { Redirect } from "react-router";

export const MainContentRedirect = (props) => {
	switch (props.role) {
		case 0: {
			return <Redirect to="/guest" />;
		}
		case 1: {
			return <Redirect to="/buyer" />;
		}
		case 2: {
			return <Redirect to="/salesman" />;
		}
		case 3: {
			return <Redirect to="/admin" />;
		}
		case 4: {
			return <Redirect to="/provider" />;
		}
		case 5: {
			return <Redirect to="/bank" />;
		}
		case 6: {
			return <Redirect to="/shop" />;
		}
		default: {
			return "";
		}
	}
};
