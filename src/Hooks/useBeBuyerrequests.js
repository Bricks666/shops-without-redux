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
			const requests = await api.getBeBuyerRequests();

			dispatch(setRequest(requests.map(toValidRequest)));
		};

		getRequests();
	}, []);

	useNewRequestSubscribe(
		async ({ requestId }) => {
			const request = await api.getBeBuyerRequest(requestId);

			dispatch(addRequest(toValidRequest(request)));
		},
		{ Name: "BeShoper" }
	);
	useFinishRequestSubscribe(
		({ requestId }) => dispatch(finishRequest(requestId)),
		{ Name: "BeShoper" }
	);

	return [state];
};
