import { useState } from "react";
import { api } from "../API/api";

export const useAccount = () => {
	const [isUnlock, setUnlock] = useState(false);

	const unlockAccount = async (evt) => {
		evt.preventDefault();

		const address = evt.target[0].value;
		const password = evt.target[1].value;

		try {
			await api.unlockAccount(address, password);

			setUnlock(true);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [isUnlock, unlockAccount];
};
