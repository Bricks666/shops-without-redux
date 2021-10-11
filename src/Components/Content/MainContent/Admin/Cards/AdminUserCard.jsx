import { UserCard } from "../../../../Shared/UserCard/UserCard";
import { getStringRole } from "../../../../../Services/getStringRole";

export const AdminUserCard = (props) => {
	return (
		<UserCard name={props.name} address={props.address}>
			<p>{getStringRole(props.role)}</p>
			{props.children}
		</UserCard>
	);
};
