import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidComment } from "../Services/toValidComment";
import { useNewCommentSubscribe } from "./Subscribes/useNewCommentSubscribe";
import { useChangeCommentMarkSubscribe } from "./Subscribes/useChangeCommentMarkSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_COMMENTS": {
			return action.comments;
		}
		case "ADD_COMMENT": {
			return [...state, action.comment];
		}
		case "CHANGE_MARK": {
			return state.map((comment) => {
				if (comment.id === action.commentId) {
					return {
						...comment,
						likes: comment.likes + (+action.mark === 1 ? 1 : 0),
						dislikes: comment.dislikes + (+action.mark === 0 ? 1 : 0),
						users: [...comment.users, action.sender],
					};
				}

				return comment;
			});
		}
		default: {
			return state;
		}
	}
};
const setComments = (comments) => {
	return {
		type: "SET_COMMENTS",
		comments,
	};
};
const addComment = (comment) => {
	return {
		type: "ADD_COMMENT",
		comment,
	};
};
const changeMark = (commentId, mark, sender) => {
	return {
		type: "CHANGE_MARK",
		commentId,
		mark,
		sender,
	};
};

export const useComments = (shopAddress, CASId) => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getComments = async () => {
			const comments = await api.getComments(shopAddress, CASId);

			dispatch(setComments(comments.map(toValidComment)));
		};

		getComments();
	}, []);

	useNewCommentSubscribe((comment) => dispatch(addComment(comment)), {
		Address: shopAddress,
		complaintsId: CASId,
	});

	useChangeCommentMarkSubscribe(
		({ commentId, mark, senderAddress: sender }) =>
			dispatch(changeMark(commentId, mark, sender)),
		{ Address: shopAddress, complaintsId: CASId }
	);

	return [state];
};
