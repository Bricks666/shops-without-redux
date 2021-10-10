import { api } from "../API/api";

export const useBeBuyerForever = () => {
	const beBuyerForever = () => {
		api.beBuyerForever();
	};

	return [beBuyerForever];
};
