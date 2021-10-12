import { useAcceptAndCancelBeAdminRequest } from "../../../../../Hooks/useAcceptAndCancelBeAdminRequest";
import { RequestCard } from "../../../../Shared/RequestCard/RequestCard";

export const BeAdminCard = (props) => {

	const [accept, cancel] = useAcceptAndCancelBeAdminRequest(props.id);

	return <RequestCard {...props} accept={accept} cancel={cancel} />;
};
