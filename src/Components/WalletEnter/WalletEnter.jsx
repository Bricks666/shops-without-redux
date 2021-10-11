import { ChooseWallet } from "./ChooseWallet/ChooseWallet";
import { PasswordInput } from "./PasswordInput/PasswordInput";
import { Button } from "../Shared/Button/Button";
import { useState } from "react";
import { Field } from "../Shared/Field/Field";

export const WalletEnter = (props) => {
	const [password, setPassword] = useState("");
	const [wallet, setWallet] = useState("");

	const onSubmit = (evt) => {
		evt.preventDefault();

		props.unlock(wallet, password);
		setWallet("");
		setPassword("");
	};

	return (
		<form onSubmit={onSubmit}>
			<ChooseWallet
				value={wallet}
				input={(evt) => setWallet(evt.target.value)}
			/>
			<Field
				value={password}
				input={(evt) => setPassword(evt.target.value)}
				type="password"
				required
			>
				Пароль от кошелька
			</Field>
			<Button>Разблокировать кошелек</Button>
		</form>
	);
};
