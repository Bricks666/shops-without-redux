import { api } from "../API/api";

export const useCreateCAS = (shopAddress) => {
	const sendCAS = async (comment, mark) => {
		try {
			const response = await api.addNewCAS(shopAddress, comment, mark);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [sendCAS];
};
