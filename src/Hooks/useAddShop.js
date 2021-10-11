import { api } from "../API/api";

export const useAddShop = () => {
	return [
		async (address, name, city, login, password) => {

			try {
				await api.addShop(address, city, name, login, password);
			} catch (e) {
				console.log(e.message);
			}
		},
	];
};
