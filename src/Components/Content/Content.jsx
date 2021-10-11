import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { MainContentRedirect } from "./MainContentRedirect";
import { Profile } from "../Profile/Profile";
import { BuyerMainContent } from "./MainContent/Buyer/BuyerMainContent";
import { UserContext } from "../../Hooks/useUserContext";
import { AdminMainContent } from "./MainContent/Admin/AdminMainContent";
import { SalesmanMainContent } from "./MainContent/Salesman/SalesmanMainContent";

export const Content = (props) => {
	const [user, setUser] = useState({ role: -1 });
	return (
		<section>
			<UserContext.Provider value={user}>
				<Profile throwUser={setUser} />
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
				</Switch>
			</UserContext.Provider>
		</section>
	);
};
