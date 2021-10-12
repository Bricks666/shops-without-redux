import { withCASList } from "../../../../HOC/withCASList";
import { GuestCASCard } from "./GuestCASCard";
import { ShopCard } from "../../../../Shared/ShopCard/ShopCard";
import { GuestSalesmanCard } from "./GuestSalesmancard";

export const TempGuestShopCard = withCASList(GuestCASCard)(ShopCard);

export const GuestShopCard = (props) => {
	return <TempGuestShopCard {...props} SalesmanCard={GuestSalesmanCard} />;
};
