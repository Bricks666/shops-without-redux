import { withCommentsList } from "../../../../HOC/withCommentsList";
import { withCommentCreate } from "../../../../HOC/withCommentCreate";
import { CommentCard } from "../../../../Shared/CommentCard/CommentCard";
import { CASCard } from "../../../../Shared/CASCard/CASCard";

export const SalesmanCASCard = withCommentCreate(
	withCommentsList(CommentCard)(CASCard)
);
