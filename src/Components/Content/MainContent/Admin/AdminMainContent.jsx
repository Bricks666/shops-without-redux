import { Route, Switch } from "react-router";
import { Navigation } from "./Navigation";
import { ShopsList } from "../../../Shared/ShopsList/ShopsList";
import { AdminShopCard } from "./Cards/AdminShopCard";
import { UsersList } from "./Lists/UsersList";
import { AdminUserCard } from "./Cards/AdminUserCard";
import { CreateNewShop } from "./CreateNewShop";
import { BeBuyerRequestsList } from "./Lists/BeBuyerRequestsList";
import { BeSalesmanRequestsList } from "./Lists/BeSalesmanRequestsList";
import { BeAdminRequestsList } from "./Lists/BeAdminRequestsList";

export const AdminMainContent = (props) => {
	return (
		<section>
			<Navigation />
			<Switch>
				<Route exact path="/admin/adminRequests">
					<BeAdminRequestsList />
				</Route>
				<Route exact path="/admin/salesmanRequests">
					<BeSalesmanRequestsList />
				</Route>
				<Route exact path="/admin/buyerRequests">
					<BeBuyerRequestsList />
				</Route>
				<Route exact path="/admin/shops">
					<CreateNewShop />
					<ShopsList ShopCard={AdminShopCard} />
				</Route>
				<Route exact path="/admin/users">
					<UsersList UserCard={AdminUserCard} />
				</Route>
			</Switch>
		</section>
	);
};
