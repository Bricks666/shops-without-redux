import { useShopsList } from "../../../Hooks/useShopsList";
import { List } from "../List/List";

export const ShopsList = (props) => {
	const [shops] = useShopsList();
	console.log(shops);
	return (
		<div>
			<h3>Магазины</h3>
			<List Card={props.ShopCard} items={shops} />
		</div>
	);
};
