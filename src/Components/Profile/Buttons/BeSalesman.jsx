import { Button } from "../../Shared/Button/Button";
import { useBeSalesman } from "../../../Hooks/useBeSalesman";

export const BeSalesman = (props) => {
	const [beSalesman] = useBeSalesman();

	return (
		<Button onClick={beSalesman} disabled={props.role === 2}>
			Быть продавцом
		</Button>
	);
};
