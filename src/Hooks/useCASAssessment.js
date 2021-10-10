import { api } from "../API/api";

export const useCASAssessment = (shopAddress, CASId) => {
	const likeCAS = async () => {
		try {
			await api.likeCAS(shopAddress, CASId);
		} catch (e) {
			console.log(e.message);
		}
	};

	const dislikeCAS = async () => {
		try {
			await api.dislikeCAS(shopAddress, CASId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [likeCAS, dislikeCAS];
};
