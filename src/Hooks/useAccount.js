import { useState } from "react";
import { api } from "../API/api";

export const useAccount = () => {
	const [isUnlock, setUnlock] = useState(false);

	const unlockAccount = async (address, password) => {
		try {
			await api.unlockAccount(address, password);

			setUnlock(true);
		} catch (e) {
			console.log(e.message);
		}
	};

	const lockAccount = async () => {
		try {
			await api.lockAccount();
			setUnlock(false);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [isUnlock, unlockAccount, lockAccount];
};
