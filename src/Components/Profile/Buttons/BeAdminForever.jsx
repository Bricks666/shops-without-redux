import { Button } from "../../Shared/Button/Button";
import { useBeAdminForever } from "../../../Hooks/useBeAdminForever";

export const BeAdminForever = () => {
	const [beAdminForever] = useBeAdminForever();
	return (
		<Button onClick={beAdminForever}>Подать заявку на администратора</Button>
	);
};
