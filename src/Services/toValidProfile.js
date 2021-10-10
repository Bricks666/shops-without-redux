export const toValidProfile = (profile) => {
	const validProfile = {
		address: profile.Address,
		balance: profile.balance,
		fio: profile.FIO,
		login: profile.login,
		role: +profile.role,
		isAdmin: profile.isAdmin,
		isSalesman: profile.isSalesman,
	};

	if (validProfile.isSalesman) {
		validProfile.shopId = profile.shopId;
	}

	return validProfile;
};
