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
import { toHex } from "../Services/toHex";

export const useBeAdminRequestsList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getRequests = async () => {
			const requests = await api.getBeAdminRequests();

			dispatch(setRequest(requests.map(toValidRequest)));
		};

		getRequests();
	}, []);

	useNewRequestSubscribe(
		async ({ requestId }) => {
			debugger;
			const request = await api.getBeAdminRequest(requestId);

			dispatch(addRequest(toValidRequest(request)));
		},
		{ Name: toHex("BeAdmin") }
	);

	useFinishRequestSubscribe(
		({ requestId }) => {
			debugger;
			dispatch(finishRequest(requestId));
		},
		{ Name: toHex("BeAdmin") }
	);

	return [state];
};
