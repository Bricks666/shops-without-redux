import { useEffect } from "react";
import { api } from "../../API/api";
import { toValidComment } from "../../Services/toValidComment";

export const useNewCommentSubscribe = (callback, filters = {}) => {
	useEffect(() => {
		const getComment = async ({
			Address: shopAddress,
			complaintsId: CASId,
			commentId,
		}) => {
			const comment = toValidComment(
				await api.getCommentById(shopAddress, CASId, commentId)
			);

			callback(comment);
		};

		const subscribe = api.subscribeNewComment(getComment, filters);

		return () => {
			subscribe.unsubscribe();
		};
	}, []);
};
