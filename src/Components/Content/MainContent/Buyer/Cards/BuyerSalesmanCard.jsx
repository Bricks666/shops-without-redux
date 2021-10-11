import { withCASList } from "../../../../HOC/withCASList";
import { BuyerCASCard } from "./BuyerCASCard";
import { UserCard } from "../../../../Shared/UserCard/UserCard";
import { withCreateCAS } from "../../../../HOC/withCreateCAS";

export const BuyerSalesmanCard = withCreateCAS(
	withCASList(BuyerCASCard)(UserCard)
);
