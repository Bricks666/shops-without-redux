import { useEffect, useState } from "react";
import { api } from "../API/api";

export const useSendedRequestBank = (shopId) => {
	const [request, setRequest] = useState(false);

	useEffect(() => {
		let id;
		const getRequest = async () => {
			try {
				const request = await api.getBankRequest(shopId);

				setRequest(request);
			} catch (e) {
				console.log(e.message);
			} finally {
				id = setTimeout(getRequest(shopId), 1500);
			}
		};

		getRequest();

		return () => {
			clearTimeout(id);
		};
	}, []);

	return [request];
};
