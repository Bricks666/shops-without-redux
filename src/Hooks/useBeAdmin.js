import { api } from "../API/api";

export const useBeAdmin = () => {
	const beAdmin = async () => {
		try {
			api.beAdmin();
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beAdmin];
};
