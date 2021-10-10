import React from "react";
import { ShopsList } from "../../../Shared/ShopsList/ShopsList";
import { BuyerShopCard } from "./Cards/BuyerShopCard";

export const BuyerMainContent = (props) => {
	return <ShopsList ShopCard={BuyerShopCard} />;
};
