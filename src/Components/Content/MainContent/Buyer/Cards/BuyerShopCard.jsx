import { useUserContext } from "../../../../../Hooks/useUserContext";
import { withCASList } from "../../../../HOC/withCASList";
import { withCreateCAS } from "../../../../HOC/withCreateCAS";
import { Button } from "../../../../Shared/Button/Button";
import { ShopCard } from "../../../../Shared/ShopCard/ShopCard";
import { BuyerCASCard } from "./BuyerCASCard";
import { useBeSalesmanForever } from "../../../../../Hooks/useBeSalesmanForever";
import { BuyerSalesmanCard } from "./BuyerSalesmanCard";

export const TempBuyerShopCard = withCreateCAS(
	withCASList(BuyerCASCard)(ShopCard)
);

export const BuyerShopCard = (props) => {
	const { isSalesman, isAdmin } = useUserContext();
	const [beSalesmanForever] = useBeSalesmanForever(props.id);
	return (
		<TempBuyerShopCard {...props} SalesmanCard={BuyerSalesmanCard}>
			{isSalesman || isAdmin ? (
				""
			) : (
				<Button onClick={beSalesmanForever}>
					Быть продавцом этого магазина
				</Button>
			)}
		</TempBuyerShopCard>
	);
};
