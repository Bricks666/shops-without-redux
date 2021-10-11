import Web3 from "web3";

export const addressIsNull = (address) => {
	return Web3.utils.hexToNumberString(address) === "0";
};
