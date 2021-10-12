import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidFreeAddress } from "../Services/toValidFreeAddress";
import { addressIsNull } from "../Services/addressIsNull";
import { useNewFreeAddressSubscribe } from "./Subscribes/useNewFreeAddressSubscribe";
import { useRemoveFreeAddressSubscribe } from "./Subscribes/useRemoveFreeAddressSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_ADDRESSES": {
			return action.addresses;
		}
		case "REMOVE_ADDRESS": {
			return state.filter((address) => address.id !== action.id);
		}
		case "ADD_ADDRESS": {
			return [...state, action.address];
		}
		default: {
			return state;
		}
	}
};
const setAddresses = (addresses) => {
	return {
		type: "SET_ADDRESSES",
		addresses,
	};
};
const removeAddress = (id) => {
	return {
		type: "REMOVE_ADDRESS",
		id,
	};
};
const addAddress = (address) => {
	return {
		type: "ADD_ADDRESS",
		address,
	};
};

export const useFreeAddresses = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getAddresses = async () => {
			try {
				const addresses = await api.getFreeAddresses();
				const validAddresses = [];
				addresses.forEach((address, index) => {
					if (addressIsNull(address) === false) {
						validAddresses.push(toValidFreeAddress(address, index));
					}
				});

				dispatch(setAddresses(validAddresses));
			} catch (e) {
				console.log(e.message);
			}
		};

		getAddresses();
	}, []);

	useNewFreeAddressSubscribe((address) => dispatch(addAddress(address)));

	useRemoveFreeAddressSubscribe(({ Address: addressId }) =>
		dispatch(removeAddress(addressId))
	);

	return [state];
};
