import { useEffect } from "react";
import { api } from "../../API/api";

export const useChangeCommentMarkSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const subscribe = api.subscribeChangeCommentMark(callback, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
