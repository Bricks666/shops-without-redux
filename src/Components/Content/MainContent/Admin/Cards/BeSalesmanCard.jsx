import { useAcceptAndCancelBeSalesmanRequest } from "../../../../../Hooks/useAcceptAndCancelBeSalesmanRequest";
import { RequestCard } from "../../../../Shared/RequestCard/RequestCard";

export const BeSalesmanCard = (props) => {
	const [accept, cancel] = useAcceptAndCancelBeSalesmanRequest(props.id);

	return (
		<RequestCard {...props} accept={accept} cancel={cancel}>
			<p>{props.shopId}</p>
		</RequestCard>
	);
};
