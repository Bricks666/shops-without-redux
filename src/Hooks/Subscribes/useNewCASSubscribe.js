import { useEffect } from "react";
import { api } from "../../API/api";
import { toValidCAS } from "../../Services/toValidCAS";

export const useNewCASSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const newCAS = async ({ Address: shopAddress, complaintsId: CASId }) => {
			try {
				const CAS = await api.getCASById(shopAddress, CASId);

				callback(toValidCAS(CAS));
			} catch (e) {
				console.log(e.message);
			}
		};

		const subscribe = api.subscribeNewCAS(newCAS, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
