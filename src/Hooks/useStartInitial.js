import { useEffect, useState } from "react";
import { api } from "../API/api";

export const useStartInitial = () => {
	const [isWeb3Initial, setInitial] = useState(false);
	const [isConnectContract, setConnect] = useState(false);

	useEffect(() => {
		const initial = async () => {
			try {
				const isInitialWeb3 = api.initialWeb3();
				setInitial(isInitialWeb3);

				const isConnectContract = await api.connectContract();

				setConnect(isConnectContract);
			} catch {
				setTimeout(initial, 1500);
			}
		};

		initial();
	}, []);

	return [isWeb3Initial && isConnectContract];
};
