import { api } from "../API/api";

export const useBeAdminForever = () => {
	const beAdminForever = async () => {
		try {
			await api.beAdminForever();
		} catch (e) {
			console.log(e.message);
		}
	};

	return [beAdminForever];
};
