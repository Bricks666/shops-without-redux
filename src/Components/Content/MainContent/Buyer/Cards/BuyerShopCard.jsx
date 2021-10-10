import { withCASList } from "../../../../HOC/withCASList";
import { withCreateCAS } from "../../../../HOC/withCreateCAS";
import { ShopCard } from "../../../../Shared/ShopCard/ShopCard";
import { BuyerCASCard } from "./BuyerCASCard";

export const BuyerShopCard = withCreateCAS(withCASList(BuyerCASCard)(ShopCard));
