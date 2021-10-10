import { useBeBuyer } from "../../../Hooks/useBeBuyer";
import { Button } from "../../Shared/Button/Button";

export const BeBuyer = (props) => {
	const [beBuyer] = useBeBuyer();

	return (
		<Button onClick={beBuyer} disabled={props.role === 1}>
			Быть покупателем
		</Button>
	);
};
