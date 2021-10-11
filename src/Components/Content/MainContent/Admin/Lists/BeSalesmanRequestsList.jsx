import { useBeSalesmanRequestsList } from "../../../../../Hooks/useBeSalesmanRequestsList";
import { BeSalesmanCard } from "../Cards/BeSalesmanCard";
import { List } from "../../../../Shared/List/List";

export const BeSalesmanRequestsList = (props) => {
	const [requests] = useBeSalesmanRequestsList();

	return (
		<>
			<h3>Запросы на повышения до продавца</h3>
			<List items={requests} Card={BeSalesmanCard} />
		</>
	);
};
