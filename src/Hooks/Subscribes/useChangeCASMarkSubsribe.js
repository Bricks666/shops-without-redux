import { useEffect } from "react";
import { api } from "../../API/api";

export const useChangeCASMarkSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeChangeCASMark(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
