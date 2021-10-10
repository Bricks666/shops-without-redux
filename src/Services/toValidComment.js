export const toValidComment = (comment) => {
	return {
		id: comment.Id,
		author: comment.login,
		content: comment.comment,
		likes: comment.likes?.length ?? 0,
		dislikes: comment.dislikes?.length ?? 0,
		users: [...(comment.likes ?? []), ...(comment.dislikes ?? [])],
	};
};
