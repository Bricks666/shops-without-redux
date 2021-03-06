import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidProfile } from "../Services/toValidProfile";
import { useChangeRoleSubscribe } from "./Subscribes/useChangeRoleSubscribe";
import { useNewRoleSubscribe } from "./Subscribes/useNewRoleSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_INFO": {
			return {
				...state,
				...action.info,
			};
		}
		case "UPDATE_BALANCE": {
			return state.balance !== action.newBalance
				? {
						...state,
						balance: action.newBalance,
				  }
				: state;
		}
		case "CHANGE_ROLE": {
			return {
				...state,
				role: +action.role,
			};
		}
		case "NEW_ROLE": {
			return {
				...state,
				role: +action.role,
				isSalesman: +action.role === 2,
				isAdmin: +action.role === 3,
			};
		}
		default: {
			return state;
		}
	}
};

const setInfo = (info) => {
	return {
		type: "SET_INFO",
		info,
	};
};
const updateBalance = (newBalance) => {
	return {
		type: "UPDATE_BALANCE",
		newBalance,
	};
};

const changeRole = (role) => {
	return {
		type: "CHANGE_ROLE",
		role,
	};
};

const newRole = (role) => {
	return {
		type: "NEW_ROLE",
		role,
	};
};

export const useProfile = (throwUser) => {
	const [state, dispatch] = useReducer(reducer, {});
	useEffect(() => {
		let intervalId;

		const getInfo = async () => {
			try {
				let info = await api.getProfileInfo();
				info.balance = await api.getBalance();
				if (+info.role === 6) {
					info = {
						...info,
						...(await api.getShopProfileInfo()),
					};
				}
				const validInfo = toValidProfile(info);
				dispatch(setInfo(validInfo));

				throwUser(validInfo);
				intervalId = setInterval(async () => {
					try {
						const newBalance = await api.getBalance();
						if (+state.balance !== +newBalance) {
							dispatch(updateBalance(+newBalance));
						}
					} catch (e) {
						console.log(e.message);
					}
				}, 1000);
			} catch (e) {
				console.log(e.message);
			}
		};

		getInfo();

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useChangeRoleSubscribe(
		({ role }) => {
			dispatch(changeRole(role));
			throwUser({ ...state, role: +role });
		},
		{
			Address: state.address,
		},
		state.address
	);

	useNewRoleSubscribe(
		({ role }) => {
			dispatch(newRole(role));
			throwUser({ ...state, role: +role });
		},
		{ Address: state.address },
		state.address
	);

	return [state];
};
