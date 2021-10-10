import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useAccount } from "../../Hooks/useAccount";
import { useStartInitial } from "../../Hooks/useStartInitial";
import { Content } from "../Content/Content";
import { ContentRedirect } from "../ContentRedirect/ContentRedicrect";
import { Login } from "../Login/Login";
import { Registration } from "../Registration/Registration";
import { WalletEnter } from "../WalletEnter/WalletEnter";
import "./App.css";

const App = (props) => {
	const [isAppInitial] = useStartInitial();

	const [isUnlock, unlock] = useAccount();

	const [isLogin, setLogin] = useState(false);

	const [isRegistration, setRegistration] = useState(false);

	if (isAppInitial === false) {
		return (
			<section>Идет инициализация приложения, пожалуйста подождите</section>
		);
	}

	console.log(isAppInitial, isUnlock, isRegistration, isLogin);

	return (
		<BrowserRouter>
			<section>
				<ContentRedirect
					isUnlock={isUnlock}
					isLogin={isLogin}
					isRegistration={isRegistration}
				/>
				<Switch>
					<Route exact path="/unlock">
						<WalletEnter unlock={unlock} />
					</Route>
					<Route path="/login">
						<Login setLogin={setLogin} />
					</Route>
					<Route path="/registration">
						<Registration setRegistration={setRegistration} />
					</Route>
					<Route path="/">
						<Content />
					</Route>
				</Switch>
			</section>
		</BrowserRouter>
	);
};

export { App };
