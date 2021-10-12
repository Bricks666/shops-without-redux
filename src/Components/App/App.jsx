import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useAccount } from "../../Hooks/useAccount";
import { useStartInitial } from "../../Hooks/useStartInitial";
import { Content } from "../Content/Content";
import { ContentRedirect } from "../ContentRedirect/ContentRedicrect";
import { Login } from "../Login/Login";
import { Registration } from "../Registration/Registration";
import { Button } from "../Shared/Button/Button";
import { WalletEnter } from "../WalletEnter/WalletEnter";
import "./App.css";
import { SpecialButtons } from "./SpecialButtons";

const App = (props) => {
	const [isAppInitial] = useStartInitial();

	const [isUnlock, unlock, lock] = useAccount();

	const [isLogin, setLogin] = useState(false);

	const [isGuest, setGuest] = useState(false);
	const [isRegistration, setRegistration] = useState(false);

	const lockAccount = () => {
		setLogin(false);
		lock();
	};

	if (isAppInitial === false) {
		return (
			<section>Идет инициализация приложения, пожалуйста подождите</section>
		);
	}

	return (
		<BrowserRouter>
			<section>
				<ContentRedirect
					isUnlock={isUnlock}
					isGuest={isGuest}
					isLogin={isLogin}
					isRegistration={isRegistration}
				/>
				<Switch>
					<Route path="/unlock">
						<WalletEnter unlock={unlock} />
					</Route>
					<Route path="/login">
						<Login setLogin={setLogin}/>
						<Button onClick={() => setGuest(true)}>Войти как гость</Button>
					</Route>
					<Route path="/registration">
						<Registration setRegistration={setRegistration} />
					</Route>
					<Route path="/">
						<Content isGuest={isGuest} />
					</Route>
				</Switch>
				<SpecialButtons
					isUnlock={isUnlock}
					isGuest={isGuest}
					guestExit={() => setGuest(false)}
					lockAccount={lockAccount}
				/>
			</section>
		</BrowserRouter>
	);
};

export { App };
