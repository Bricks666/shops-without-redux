import { useEffect } from "react";
import { api } from "../../API/api";
import { toValidFreeAddress } from "../../Services/toValidFreeAddress";

export const useNewFreeAddressSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const getAddress = async ({ Address: addressId }) => {
			const validAddress = toValidFreeAddress(
				await api.getFreeAddress(addressId),
				addressId
			);

			callback(validAddress);
		};

		const subscribe = api.subscribeNewFreeAddress(getAddress, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
