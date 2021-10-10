import { withCASAssessment } from "../../../../HOC/withCASAssessment";
import { withCommentCreate } from "../../../../HOC/withCommentCreate";
import { withCommentsList } from "../../../../HOC/withCommentsList";
import { CASCard } from "../../../../Shared/CASCard/CASCard";
import { BuyerCommentCard } from "./BuyerCommentCard";

export const BuyerCASCard = withCommentCreate(
	withCommentsList(BuyerCommentCard)(withCASAssessment(CASCard))
);
