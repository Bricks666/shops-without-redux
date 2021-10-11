export const toValidSalesman = (salesman) => {
	return {
		name: salesman.FIO || salesman.name,
		address: salesman.Address || salesman.address,
	};
};
