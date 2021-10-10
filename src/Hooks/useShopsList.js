import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidShop } from "../Services/toValidShop";
import { useNewShopSubscribe } from "./Subscribes/useNewShopSubscribe";
import { useRemoveShopSubscribe } from "./Subscribes/useRemoveShopSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_SHOPS": {
			return [...action.shops];
		}
		case "ADD_SHOP": {
			return [action.shop, ...state];
		}
		case "REMOVE_SHOP": {
			return state.filter((shop) => shop.address !== action.shopAddress);
		}
		default: {
			return state;
		}
	}
};

const setShops = (shops) => {
	return {
		type: "SET_SHOPS",
		shops,
	};
};
const addShop = (shop) => {
	return {
		type: "ADD_SHOP",
		shop,
	};
};
const removeShop = (shopAddress) => {
	return {
		type: "REMOVE_SHOP",
		shopAddress,
	};
};

export const useShopsList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getShops = async () => {
			const shops = (await api.getShops()).map(toValidShop);

			dispatch(setShops(shops));
		};

		getShops();
	}, []);

	useNewShopSubscribe((shop) => dispatch(addShop(shop)));

	useRemoveShopSubscribe((shopAddress) => dispatch(removeShop(shopAddress)));

	return [state];
};
