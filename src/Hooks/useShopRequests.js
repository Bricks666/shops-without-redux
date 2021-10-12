import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { reducer, setRequest } from "../Services/requestsReducer";
import { toValidBankRequest } from "../Services/toValidBankRequest";

export const useShopRequests = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		let id;
		const getRequests = async () => {
			try {
				const shopIds = await api.getShopRequestsId();

				const shops = [];
				const requests = [];
				shopIds.forEach((id) => {
					shops.push(api.getShop(id));
					requests.push(api.getBankRequest(id));
				});

				const validShops = await Promise.all(shops);
				const validRequests = await Promise.all(requests);

				const shopRequests = [];
				for (let i = 0; i < requests.length; i++) {
					shopRequests.push(
						toValidBankRequest(validRequests[i], validShops[i])
					);
				}

				dispatch(setRequest(shopRequests));
			} catch (e) {
				console.log(e.message);
			} finally {
				id = setTimeout(getRequests, 1500);
			}
		};
		return () => {
			clearTimeout(id);
		};
	}, []);

	return [state];
};
