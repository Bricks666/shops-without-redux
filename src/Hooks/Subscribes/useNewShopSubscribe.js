import { useEffect } from "react";
import { api } from "../../API/api";
import { toValidShop } from "../../Services/toValidShop";

export const useNewShopSubscribe = (callback, filters = {}, condition) => {
	useEffect(() => {
		const getShop = async ({ Address: shopAddress }) => {
			try {
				const shopId = await api.getShopIdByAddress(shopAddress);
				const shop = await api.getShop(shopId);

				callback(toValidShop(shop));
			} catch (e) {
				console.log(e.message);
			}
		};

		const subscribe = api.subscribeAddShop(getShop, filters);
		console.log(subscribe);

		return () => {
			subscribe.unsubscribe();
		};
	}, [condition]);
};
