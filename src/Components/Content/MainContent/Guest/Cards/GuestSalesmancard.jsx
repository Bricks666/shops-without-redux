import { withCASList } from "../../../../HOC/withCASList";
import { GuestCASCard } from "./GuestCASCard";
import { UserCard } from "../../../../Shared/UserCard/UserCard";

export const GuestSalesmanCard = withCASList(GuestCASCard)(UserCard);
