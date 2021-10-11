import { api } from "../API/api";

export const useRemoveShop = (shopId) => {
	const removeShop = async () => {
		try {
			await api.removeShop(shopId);
		} catch (e) {
			console.log(e.message);
		}
	};
	return [removeShop];
};
