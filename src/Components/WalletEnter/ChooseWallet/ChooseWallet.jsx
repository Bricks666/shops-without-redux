import { useWalletsAddresses } from "../../../Hooks/useWalletsAddresses";
import { Select } from "../../Shared/Select/Select";

export const ChooseWallet = (props) => {
	const [walletsAddresses] = useWalletsAddresses();

	return (
		<Select
			value={props.value}
			input={props.input}
			names={walletsAddresses}
			values={walletsAddresses}
			required={true}
		/>
	);
};
