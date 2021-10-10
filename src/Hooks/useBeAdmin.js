import { api } from "../API/api";

export const useBeAdmin = () => {
	const beAdmin = () => {
		api.beAdmin();
	};

	return [beAdmin];
};
