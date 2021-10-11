export const toValidUser = (user) => {
	return {
		address: user.Address,
		name: user.FIO,
		role: +user.role,
	};
};
