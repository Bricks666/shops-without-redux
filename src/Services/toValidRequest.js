export const toValidRequest = (request) => {
	const validRequest = {
		id: +request.id,
		sender: request.Address,
		currentRole: +request.currentRole,
		newRole: +request.newRole,
		isFinish: request.finish,
	};

	if (+request.shopId !== -1) {
		validRequest.shopId = +request.shopId;
	}

	return validRequest;
};
