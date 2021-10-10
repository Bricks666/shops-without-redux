import Web3 from "web3";

export const hashing = (data) => {
	return Web3.utils.keccak256(data);
};
