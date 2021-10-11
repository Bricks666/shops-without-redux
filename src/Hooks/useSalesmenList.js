import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidSalesman } from "../Services/toValidSalesman";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_SALESMEN": {
			return action.salesmen;
		}
		default: {
			return state;
		}
	}
};

const setSalesmen = (salesmen) => {
	return {
		type: "SET_SALESMEN",
		salesmen,
	};
};

export const useSalesmenList = (salesmenAddresses) => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getSalesmen = async () => {
			const salesmen = [];
			salesmenAddresses.forEach((address) => {
				const index = state.findIndex((salesman) => {
					return salesman.address === address;
				});

				if (index === -1) {
					salesmen.push(api.getUserInfo(address));
				} else {
					salesmen.push(state[index]);
				}
			});
			const promiseSalesmen = await Promise.all(salesmen);
			console.log(promiseSalesmen);
			dispatch(setSalesmen(promiseSalesmen.map(toValidSalesman)));
		};

		getSalesmen();
		try {
		} catch (e) {
			console.log(e.message);
		}
	}, [salesmenAddresses]);

	return [state];
};
