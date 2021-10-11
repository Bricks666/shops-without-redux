import { useEffect } from "react";
import { api } from "../../API/api";

export const useNewSalesmanSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeNewSalesman(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
