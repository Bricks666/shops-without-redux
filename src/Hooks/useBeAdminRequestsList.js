import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import {
	addRequest,
	finishRequest,
	reducer,
	setRequest,
} from "../Services/requestsReducer";
import { toValidRequest } from "../Services/toValidRequest";
import { useNewRequestSubscribe } from "./Subscribes/useNewRequestSubscribe";
import { useFinishRequestSubscribe } from "./Subscribes/useFinishRequestSubscribe";

export const useBeAdminRequestsList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getRequests = async () => {
			try {
				const requests = await api.getBeAdminRequests();

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
				const request = await api.getBeAdminRequest(requestId);

				dispatch(addRequest(toValidRequest(request)));
			} catch (e) {
				console.log(e.message);
			}
		},
		{ typeCode: 3 }
	);

	useFinishRequestSubscribe(
		({ requestId }) => {
			dispatch(finishRequest(+requestId));
		},
		{ typeCode: 3 }
	);

	return [state];
};
