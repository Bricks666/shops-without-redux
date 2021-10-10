import { api } from "../API/api";

export const useCreateComment = (shopAddress, CASId) => {

	const createComment = async (comment) => {
		try {
			const response = await api.addNewComment(shopAddress, CASId, comment);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [createComment];
};
