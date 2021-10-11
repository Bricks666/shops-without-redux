import { useEffect } from "react";
import { api } from "../../API/api";

export const useRemoveSalesmanSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeRemoveSalesman(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
