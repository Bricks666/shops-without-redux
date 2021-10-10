import { useBeAdmin } from "../../../Hooks/useBeAdmin";
import { Button } from "../../Shared/Button/Button";

export const BeAdmin = (props) => {
	const [beAdmin] = useBeAdmin();

	return (
		<Button onClick={beAdmin} disabled={props.role === 3}>
			Быть администратором
		</Button>
	);
};
