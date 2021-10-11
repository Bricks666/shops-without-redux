import { useEffect } from "react";
import { api } from "../../API/api";
import { toValidUser } from "../../Services/toValidUser";

export const useNewUserSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const getUser = async ({ user: userAddress }) => {
			const user = await api.getUserInfo(userAddress);

			callback(toValidUser(user));
		};

		const subscribe = api.subscribeNewUser(getUser, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
