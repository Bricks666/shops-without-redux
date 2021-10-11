export const UserCard = (props) => {

	return (
		<li>
			<p>{props.name}</p>
			<p>{props.address}</p>
			{props.children}
		</li>
	);
};
