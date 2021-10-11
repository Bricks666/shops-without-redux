import { api } from "../API/api";

export const useAcceptAndCancelBeBuyerRequest = (requestId) => {
	const accept = async () => {
		try {
			await api.acceptBeBuyerRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const cancel = async () => {
		try {
			await api.cancelBeBuyerRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [accept, cancel];
};
