import { useEffect } from "react";
import { api } from "../../API/api";

export const useChangeRoleSubscribe = (callback, filters = {}, condition) => {
	useEffect(() => {
		console.log("subscribe");
		const subscribe = api.subscribeChangeRole(callback, filters);
		return () => {
			subscribe.unsubscribe();
			console.log("unsubscribe");
		};
	}, [condition]);
};
