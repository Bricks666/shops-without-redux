export const toValidShop = (shop) => {
	return {
		id: shop.Id,
		address: shop.Address,
		city: shop.city,
		salesmen: shop.salesmans ?? [],
		haveBankMoney: shop.haveBankMoney,
	};
};
