import { useEffect } from "react";
import { api } from "../../API/api";

export const useFinishRequestSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeFinishRequest(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
