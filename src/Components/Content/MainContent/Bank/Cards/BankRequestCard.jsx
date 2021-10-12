import { useAcceptAndCancelShopRequest } from "../../../../../Hooks/useAcceptAndCancelShopRequest";
import { RequestCard } from "../../../../Shared/RequestCard/RequestCard";

export const BankRequestCard = (props) => {
	const [accept, cancel] = useAcceptAndCancelShopRequest(props.id);

	return <RequestCard {...props} accept={accept} cancel={cancel} />;
};
