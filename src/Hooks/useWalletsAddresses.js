import { useEffect, useState } from "react";
import { api } from "../API/api";

export const useWalletsAddresses = () => {
	const [walletsAddresses, setWalletsAddresses] = useState([]);

	useEffect(() => {
		const getWallets = async () => {
			const wallets = await api.getWalletsAddresses();
			setWalletsAddresses(wallets);
		};

		getWallets();
	}, []);

	return [walletsAddresses];
};
