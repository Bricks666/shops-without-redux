import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidCAS } from "../Services/toValidCAS";
import { useChangeCASMarkSubscribe } from "./Subscribes/useChangeCASMarkSubsribe";
import { useNewCASSubscribe } from "./Subscribes/useNewCASSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_CAS": {
			return action.CAS;
		}
		case "ADD_CAS": {
			return [...state, action.CAS];
		}
		case "CHANGE_MARK": {
			return state.map((CAS) => {
				if (CAS.id === action.CASId) {
					return {
						...CAS,
						users: [...CAS.users, action.sender],
						likes: CAS.likes + +action.mark === 1 ? 1 : 0,
						dislikes: CAS.dislikes + +action.mark === 0 ? 1 : 0,
					};
				}

				return CAS;
			});
		}
		default: {
			return state;
		}
	}
};

const setCAS = (CAS) => {
	return {
		type: "SET_CAS",
		CAS,
	};
};
const addCAS = (CAS) => {
	return {
		type: "ADD_CAS",
		CAS,
	};
};

const changeMark = (CASId, mark, sender) => {
	return {
		type: "CHANGE_MARK",
		CASId,
		mark,
		sender,
	};
};

export const useCASList = (shopAddress) => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getCAS = async () => {
			try {
				const CAS = await api.getCAS(shopAddress);

				dispatch(setCAS(CAS.map(toValidCAS)));
			} catch (e) {
				console.log(e.message);
			}
		};

		getCAS();
	}, []);

	useNewCASSubscribe((CAS) => dispatch(addCAS(CAS)), { Address: shopAddress });

	useChangeCASMarkSubscribe(
		({ complaintsId: CASId, mark, senderAddress: sender }) => {
			dispatch(changeMark(CASId, mark, sender));
		},
		{ Address: shopAddress }
	);

	return [state];
};
