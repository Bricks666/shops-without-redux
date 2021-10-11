import Web3 from "web3";

export const toHex = (value) => {
	return Web3.utils.toHex(value);
};
