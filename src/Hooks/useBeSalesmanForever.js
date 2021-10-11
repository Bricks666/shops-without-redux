import { api } from "../API/api";

export const useBeSalesmanForever = (shopId) => {
	const beSalesmanForever = async () => {
		try {
			await api.beSalesmanForever(shopId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beSalesmanForever];
};
