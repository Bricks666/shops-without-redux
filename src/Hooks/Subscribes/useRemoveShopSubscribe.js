import { useEffect } from "react";
import { api } from "../../API/api";

export const useRemoveShopSubscribe = (callback, filters = {}, condition) => {
	useEffect(() => {
		const subscribe = api.subscribeRemoveShop();

		return () => {
			subscribe.unsubscribe();
		};
	}, [condition]);
};
