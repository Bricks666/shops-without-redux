import { useBeAdminRequestsList } from "../../../../../Hooks/useBeAdminRequestsList";
import { List } from "../../../../Shared/List/List";
import { BeAdminCard } from "../Cards/BeAdminCard";

export const BeAdminRequestsList = (props) => {
	const [requests] = useBeAdminRequestsList();

	return (
		<>
			<h3>Запросы на повышение до администратора</h3>
			<List items={requests} Card={BeAdminCard} />
		</>
	);
};
