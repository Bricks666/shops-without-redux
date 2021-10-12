import { api } from "../API/api";

export const useAcceptAndCancelShopRequest = (shopId) => {
	const accept = async () => {
		try {
			await api.acceptShopRequest(shopId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const cancel = async () => {
		try {
			await api.cancelShopRequest(shopId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [accept, cancel];
};
