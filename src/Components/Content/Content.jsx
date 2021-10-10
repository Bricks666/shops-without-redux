import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { MainContentRedirect } from "./MainContentRedirect";
import { Profile } from "../Profile/Profile";
import { BuyerMainContent } from "./MainContent/Buyer/BuyerMainContent";

export const Context = React.createContext();

export const Content = (props) => {
	const [user, setUser] = useState({ role: -1 });
	console.log(user);
	return (
		<section>
			<Context.Provider value={user}>
				<Profile throwUser={setUser} />
				<MainContentRedirect role={user.role} />
				<Switch>
					<Route path="/shops">
						<BuyerMainContent />
					</Route>
				</Switch>
			</Context.Provider>
		</section>
	);
};
