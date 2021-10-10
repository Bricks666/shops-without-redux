import { useBeBuyerForever } from "../../../Hooks/useBeBuyerForever";
import { Button } from "../../Shared/Button/Button";

export const BeBuyerForever = (props) => {
	const [beBuyerForever] = useBeBuyerForever();

	return <Button onClick={beBuyerForever}>Быть покупателем навсегда</Button>;
};
