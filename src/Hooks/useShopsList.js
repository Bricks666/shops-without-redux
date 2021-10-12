import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidShop } from "../Services/toValidShop";
import { useNewShopSubscribe } from "./Subscribes/useNewShopSubscribe";
import { useRemoveShopSubscribe } from "./Subscribes/useRemoveShopSubscribe";
import { useNewSalesmanSubscribe } from "./Subscribes/useNewSalesmanSubscribe";
import { useRemoveSalesmanSubscribe } from "./Subscribes/useRemoveSalesmanSubscribe";

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
		case "NEW_SALESMAN": {
			return state.map((shop) => {
				if (shop.id === action.shopId) {
					return {
						...shop,
						salesmen: [...shop.salesmen, action.salesmanAddress],
					};
				}

				return shop;
			});
		}
		case "REMOVE_SALESMAN": {
			return state.map((shop) => {
				if (shop.id === action.shopId) {
					return {
						...shop,
						salesmen: shop.salesmen.filter(
							(address) => address !== action.salesmanAddress
						),
					};
				}
				return shop;
			});
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
const newSalesman = (salesmanAddress, shopId) => {
	return {
		type: "NEW_SALESMAN",
		salesmanAddress,
		shopId,
	};
};
const removeSalesman = (salesmanAddress, shopId) => {
	return {
		type: "REMOVE_SALESMAN",
		salesmanAddress,
		shopId,
	};
};

export const useShopsList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getShops = async () => {
			try {
				const shops = (await api.getShops()).map(toValidShop);

				dispatch(setShops(shops));
			} catch (e) {
				console.log(e.message);
			}
		};

		getShops();
	}, []);

	useNewShopSubscribe((shop) => dispatch(addShop(shop)));

	useRemoveShopSubscribe((shopAddress) => dispatch(removeShop(shopAddress)));

	useNewSalesmanSubscribe(({ Address: salesmanAddress, shopId }) =>
		dispatch(newSalesman(salesmanAddress, shopId))
	);
	useRemoveSalesmanSubscribe(({ Address: salesmanAddress, shopId }) =>
		dispatch(removeSalesman(salesmanAddress, shopId))
	);

	return [state];
};
