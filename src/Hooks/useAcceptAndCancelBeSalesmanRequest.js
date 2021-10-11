import { api } from "../API/api";

export const useAcceptAndCancelBeSalesmanRequest = (requestId) => {
	const accept = async () => {
		try {
			await api.acceptBeSalesmanRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const cancel = async () => {
		try {
			await api.cancelBeSalesmanRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [accept, cancel];
};
