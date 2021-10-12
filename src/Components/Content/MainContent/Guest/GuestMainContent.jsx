import { ShopsList } from "../../../Shared/ShopsList/ShopsList";
import { GuestShopCard } from "./Cards/GuestShopCard";

export const GuestMainContent = (props) => {
	return (
		<section>
			<ShopsList ShopCard={GuestShopCard} />
		</section>
	);
};
