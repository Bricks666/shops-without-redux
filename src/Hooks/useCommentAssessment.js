import { api } from "../API/api";

export const useCommentAssessment = (shopAddress, CASId, commentId) => {
	const like = async () => {
		try {
			debugger;
			const response = api.likeComment(shopAddress, CASId, commentId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const dislike = async () => {
		try {
			const response = api.dislikeComment(shopAddress, CASId, commentId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [like, dislike];
};
