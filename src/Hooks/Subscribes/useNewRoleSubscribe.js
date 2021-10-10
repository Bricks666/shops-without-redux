import { useEffect } from "react";
import { api } from "../../API/api";

export const useNewRoleSubscribe = (callback, filters = {}, condition) => {
	useEffect(() => {
		console.log("subscribe");
		const subscribe = api.subscribeNewRole(callback, filters);

		return () => {
			console.log("unsubscribe");
			subscribe.unsubscribe();
		};
	}, [condition]);
};
