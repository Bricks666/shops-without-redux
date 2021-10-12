import { useWalletsAddresses } from "../../Hooks/useWalletsAddresses";
import { Button } from "../Shared/Button/Button";
import { useState } from "react";
import { Field } from "../Shared/Field/Field";
import { Select } from "../Shared/Select/Select";

export const WalletEnter = (props) => {
	const [walletsAddresses] = useWalletsAddresses();
	const [password, setPassword] = useState("");
	const [wallet, setWallet] = useState(walletsAddresses[0]);
  console.log(wallet);

	const onSubmit = (evt) => {
		evt.preventDefault();

		props.unlock(wallet, password);
		setWallet("");
		setPassword("");
	};

	return (
		<form onSubmit={onSubmit}>
			<Select
				input={(evt) => setWallet(evt.target.value)}
				value={wallet}
				values={walletsAddresses}
				names={walletsAddresses}
				required
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
