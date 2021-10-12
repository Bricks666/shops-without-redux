import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { MainContentRedirect } from "./MainContentRedirect";
import { Profile } from "../Profile/Profile";
import { BuyerMainContent } from "./MainContent/Buyer/BuyerMainContent";
import { UserContext } from "../../Hooks/useUserContext";
import { AdminMainContent } from "./MainContent/Admin/AdminMainContent";
import { SalesmanMainContent } from "./MainContent/Salesman/SalesmanMainContent";
import { ShopMainContent } from "./MainContent/Shop/ShopMainContent";
import { GuestMainContent } from "./MainContent/Guest/GuestMainContent";
import { BankMainContent } from "./MainContent/Bank/BankMainContent";

export const Content = (props) => {
	const [user, setUser] = useState({ role: props.isGuest ? 0 : -1 });
	return (
		<section>
			<UserContext.Provider value={user}>
				{props.isGuest ? "" : <Profile throwUser={setUser} />}
				<MainContentRedirect role={user.role} />
				<Switch>
					<Route path="/buyer">
						<BuyerMainContent />
					</Route>
					<Route path="/admin">
						<AdminMainContent />
					</Route>
					<Route path="/salesman">
						<SalesmanMainContent />
					</Route>
					<Route path="/shop">
						<ShopMainContent />
					</Route>
					<Route path="/guest">
						<GuestMainContent />
					</Route>
					<Route path="/bank">
						<BankMainContent />
					</Route>
				</Switch>
			</UserContext.Provider>
		</section>
	);
};
