import { useEffect } from "react";
import { api } from "../../API/api";

export const useRemoveFreeAddressSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeRemoveFreeAddress(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
