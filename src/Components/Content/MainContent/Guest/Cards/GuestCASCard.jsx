import { withCommentsList } from "../../../../HOC/withCommentsList";
import { CommentCard } from "../../../../Shared/CommentCard/CommentCard";
import { CASCard } from "../../../../Shared/CASCard/CASCard";

export const GuestCASCard = withCommentsList(CommentCard)(CASCard);
