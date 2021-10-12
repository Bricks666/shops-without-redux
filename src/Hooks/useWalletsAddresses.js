import { useEffect, useState } from "react";
import { api } from "../API/api";

export const useWalletsAddresses = () => {
	const [walletsAddresses, setWalletsAddresses] = useState([]);

	useEffect(() => {
		const getWallets = async () => {
			try {
				const wallets = await api.getWalletsAddresses();
				setWalletsAddresses(wallets);
			} catch (e) {
				console.log(e.message);
			}
		};

		getWallets();
	}, []);

	return [walletsAddresses];
};
