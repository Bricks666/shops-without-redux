import { useAcceptAndCancelBeBuyerRequest } from "../../../../../Hooks/useAcceptAndCancelBeBuyerRequest";
import { RequestCard } from "../../../../Shared/RequestCard/RequestCard";

export const BeBuyerCard = (props) => {
	const [accept, cancel] = useAcceptAndCancelBeBuyerRequest(props.id);
	return <RequestCard {...props} accept={accept} cancel={cancel} />;
};
