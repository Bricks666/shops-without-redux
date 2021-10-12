import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidRequest } from "../Services/toValidRequest";
import { useNewRequestSubscribe } from "./Subscribes/useNewRequestSubscribe";
import { useFinishRequestSubscribe } from "./Subscribes/useFinishRequestSubscribe";
import {
	reducer,
	setRequest,
	addRequest,
	finishRequest,
} from "../Services/requestsReducer";

export const useBeBuyerRequests = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getRequests = async () => {
			try {
				const requests = await api.getBeBuyerRequests();
				console.log(requests);

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
				const request = await api.getBeBuyerRequest(requestId);
				console.log(requestId);
				dispatch(addRequest(toValidRequest(request)));
			} catch (e) {
				console.log(e.message);
			}
		},
		{ typeCode: 1 }
	);
	useFinishRequestSubscribe(
		({ requestId }) => dispatch(finishRequest(+requestId)),
		{ typeCode: 1 }
	);

	return [state];
};
