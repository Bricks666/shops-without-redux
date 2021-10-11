import { useBeBuyerRequests } from "../../../../../Hooks/useBeBuyerrequests";
import { List } from "../../../../Shared/List/List";
import { BeBuyerCard } from "../Cards/BeBuyerCard";

export const BeBuyerRequestsList = (props) => {
	const [requests] = useBeBuyerRequests();

	return (
		<>
			<h3>Запросы быть покупателем</h3>
			<List items={requests} Card={BeBuyerCard} />
		</>
	);
};
