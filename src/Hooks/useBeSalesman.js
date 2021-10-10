import { api } from "../API/api";

export const useBeSalesman = () => {
	const beSalesman = () => {
		api.beSalesman();
	};

	return [beSalesman];
};
