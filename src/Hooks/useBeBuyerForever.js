import { api } from "../API/api";

export const useBeBuyerForever = () => {
	const beBuyerForever = async () => {
		try {
			await api.beBuyerForever();
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beBuyerForever];
};
