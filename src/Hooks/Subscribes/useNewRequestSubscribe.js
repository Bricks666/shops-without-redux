import { useEffect } from "react";
import { api } from "../../API/api";

export const useNewRequestSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		console.log(filters);
		const subscribe = api.subscribeNewRequest(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
