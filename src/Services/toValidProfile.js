export const toValidProfile = (profile) => {
	const validProfile = {
		address: profile.Address,
		balance: profile.balance,
		name: profile.FIO,
		login: profile.login,
		role: +profile.role,
		isAdmin: profile.isAdmin,
		isSalesman: profile.isSalesman,
	};

	if (validProfile.isSalesman) {
		validProfile.shopId = profile.shopId;
	}

	if (validProfile.role === 6) {
		validProfile.city = profile.city;
		validProfile.id = profile.Id;
		validProfile.haveBankMoney = profile.haveBankMoney;
	}

	return validProfile;
};
