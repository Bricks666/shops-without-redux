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
			const requests = await api.getBeSalesmanRequests();

			dispatch(setRequest(requests.map(toValidRequest)));
		};

		getRequests();
	}, []);

	useNewRequestSubscribe(
		async ({ requestId }) => {
			const request = await api.getBeSalesmanRequest(requestId);

			dispatch(addRequest(toValidRequest(request)));
		},
		{ Name: "BeSalesman" }
	);

	useFinishRequestSubscribe(
		({ requestId }) => dispatch(finishRequest(requestId)),
		{ Name: "BeSalesman" }
	);

	return [state];
};
