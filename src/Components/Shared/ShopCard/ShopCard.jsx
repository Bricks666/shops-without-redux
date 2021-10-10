export const ShopCard = (props) => {
	return (
		<li>
			<h4>{props.address}</h4>
			<p>{props.city}</p>
			{props.children}
		</li>
	);
};
