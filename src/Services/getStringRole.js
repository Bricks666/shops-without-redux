export const getStringRole = (role) => {
	switch (role) {
		case 1: {
			return "Buyer";
		}
		case 2: {
			return "Salesman";
		}
		case 3: {
			return "Admin";
		}
		default: {
			return "Guest";
		}
	}
};
