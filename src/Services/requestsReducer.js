export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_REQUESTS": {
			return action.requests;
		}
		case "ADD_REQUEST": {
			return [...state, action.request];
		}
		case "FINISH_REQUEST": {
			return state.map((request) => {
				if (request.id === action.requestId) {
					return {
						...request,
						isFinish: true,
					};
				}
				return request;
			});
		}
		default: {
			return state;
		}
	}
};

export const setRequest = (requests) => {
	return {
		type: "SET_REQUESTS",
		requests,
	};
};
export const addRequest = (request) => {
	return {
		type: "ADD_REQUEST",
		request,
	};
};
export const finishRequest = (requestId) => {
	return {
		type: "FINISH_REQUEST",
		requestId,
	};
};
