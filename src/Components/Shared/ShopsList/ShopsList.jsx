import { Button } from "../Button/Button";
import { BottomWindow } from "../BottomWindow/BottomWindow";
import { useShopsList } from "../../../Hooks/useShopsList";
import { List } from "../List/List";

export const ShopsList = (props) => {
	const [shops] = useShopsList();
	console.log(shops);
	return (
		<div>
			<List Card={props.ShopCard} items={shops} />
			<Button>Показать продавцов</Button>
			{props.children}
			<BottomWindow></BottomWindow>
		</div>
	);
};
