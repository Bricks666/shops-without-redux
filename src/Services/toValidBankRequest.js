export const toValidBankRequest = (requestStatus, shopInfo) => {
	return {
		id: shopInfo.Id,
    sender: shopInfo.Address,
		isFinish: requestStatus && shopInfo.haveBankMoney,
	};
};
