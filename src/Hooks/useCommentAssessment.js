import { api } from "../API/api";

export const useCommentAssessment = (shopAddress, CASId, commentId) => {
	const like = async () => {
		try {

			await api.likeComment(shopAddress, CASId, commentId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const dislike = async () => {
		try {
			await api.dislikeComment(shopAddress, CASId, commentId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [like, dislike];
};
