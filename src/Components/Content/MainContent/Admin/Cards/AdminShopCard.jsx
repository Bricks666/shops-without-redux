import { useRemoveShop } from "../../../../../Hooks/useRemoveShop";
import { Button } from "../../../../Shared/Button/Button";
import { ShopCard } from "../../../../Shared/ShopCard/ShopCard";
import { UserCard } from "../../../../Shared/UserCard/UserCard";

export const AdminShopCard = (props) => {
	const [removeShop] = useRemoveShop(props.id);
	return (
		<ShopCard {...props} SalesmanCard={UserCard}>
			<Button onClick={removeShop}>Удалить магазин</Button>
			{props.children}
		</ShopCard>
	);
};
