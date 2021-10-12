import { api } from "../API/api";

export const useBeSalesman = () => {
	const beSalesman = async () => {
		try {
			await api.beSalesman();
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beSalesman];
};
