import { useState } from "react";
import { api } from "../API/api";

const subscribers = [];

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
			subscribers.forEach((element) => element());
			setUnlock(false);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [isUnlock, unlockAccount, lockAccount];
};

export const subscribeLock = (subscriber) => {
	subscribers.push(subscriber);
};
