import { api } from "../API/api";

export const useBeBuyer = () => {
	const beBuyer = () => {
		api.beBuyer();
	};

	return [beBuyer];
};
