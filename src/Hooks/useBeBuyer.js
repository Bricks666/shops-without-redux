import { api } from "../API/api";

export const useBeBuyer = () => {
	const beBuyer = async () => {
		try {
			await api.beBuyer();
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beBuyer];
};
