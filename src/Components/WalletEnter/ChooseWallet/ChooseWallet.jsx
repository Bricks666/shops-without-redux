import { useWalletsAddresses } from "../../../Hooks/useWalletsAddresses";

export const ChooseWallet = (props) => {
	const [walletsAddresses] = useWalletsAddresses(props.web3);
	console.log(walletsAddresses);
	return (
		<select required select="0">
			{walletsAddresses.map((wallet) => {
				return (
					<option key={wallet} value={wallet}>
						{wallet}
					</option>
				);
			})}
		</select>
	);
};
