import { api } from "../API/api";

export const useAcceptAndCancelBeAdminRequest = (requestId) => {
	const accept = async () => {
		try {
			await api.acceptBeAdminRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};
	const cancel = async () => {
		try {
			await api.cancelBeAdminRequest(requestId);
		} catch (e) {
			console.log(e.message);
		}
	};

	return [accept, cancel];
};
