import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import {
	addRequest,
	finishRequest,
	reducer,
	setRequest,
} from "../Services/requestsReducer";
import { toValidRequest } from "../Services/toValidRequest";
import { useFinishRequestSubscribe } from "./Subscribes/useFinishRequestSubscribe";
import { useNewRequestSubscribe } from "./Subscribes/useNewRequestSubscribe";

export const useBeSalesmanRequestsList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getRequests = async () => {
			try {
				const requests = await api.getBeSalesmanRequests();

				dispatch(setRequest(requests.map(toValidRequest)));
			} catch (e) {
				console.log(e.message);
			}
		};

		getRequests();
	}, []);

	useNewRequestSubscribe(
		async ({ requestId }) => {
			try {
				const request = await api.getBeSalesmanRequest(requestId);

				dispatch(addRequest(toValidRequest(request)));
			} catch (e) {
				console.log(e.message);
			}
		},
		{ typeCode: 2 }
	);

	useFinishRequestSubscribe(
		({ requestId }) => dispatch(finishRequest(+requestId)),
		{ typeCode: 2 }
	);

	return [state];
};
