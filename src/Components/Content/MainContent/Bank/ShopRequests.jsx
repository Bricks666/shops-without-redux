import { useShopRequests } from "../../../../Hooks/useShopRequests";
import { BankRequestCard } from "./Cards/BankRequestCard";
import { List } from "../../../Shared/List/List";

export const ShopRequests = (props) => {
	const [requests] = useShopRequests();
	return <List items={requests} Card={BankRequestCard} />;
};
