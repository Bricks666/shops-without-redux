import { ChooseWallet } from "./ChooseWallet/ChooseWallet";
import { PasswordInput } from "./PasswordInput/PasswordInput";
import { Button } from "../Shared/Button/Button";

export const WalletEnter = (props) => {
	return (
		<form onSubmit={props.unlock}>
			<ChooseWallet />
			<PasswordInput />
			<Button>Разблокировать кошелек</Button>
		</form>
	);
};
