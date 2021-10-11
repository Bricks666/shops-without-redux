import { List } from "../../../../Shared/List/List";
import { useUsersList } from "../../../../../Hooks/useUsersList";

export const UsersList = (props) => {
	const [users] = useUsersList();

	return (
		<section>
			<h3>Пользователи</h3>
			<List items={users} Card={props.UserCard} />
		</section>
	);
};
