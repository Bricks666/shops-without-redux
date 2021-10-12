import { useEffect, useReducer } from "react";
import { api } from "../API/api";
import { toValidUser } from "../Services/toValidUser";
import { useChangeRoleSubscribe } from "./Subscribes/useChangeRoleSubscribe";
import { useNewRoleSubscribe } from "./Subscribes/useNewRoleSubscribe";
import { useNewUserSubscribe } from "./Subscribes/useNewUserSubscribe";

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USERS": {
			return action.users;
		}
		case "CHANGE_ROLE": {
			return state.map((user) => {
				if (user.address === action.userAddress) {
					return {
						...user,
						role: +action.role,
					};
				}
				return user;
			});
		}
		case "NEW_ROLE": {
			return state.map((user) => {
				if (user.address === action.userAddress) {
					return {
						...user,
						role: +action.role,
						isAdmin: +action.role === 3,
						isSalesman: +action.role === 2,
					};
				}
				return user;
			});
		}
		case "NEW_USER": {
			return [...state, action.user];
		}
		default: {
			return state;
		}
	}
};

const setUsers = (users) => {
	return {
		type: "SET_USERS",
		users,
	};
};
const changeRole = (userAddress, role) => {
	return {
		type: "CHANGE_ROLE",
		userAddress,
		role,
	};
};
const newRole = (userAddress, role) => {
	return {
		type: "NEW_ROLE",
		userAddress,
		role,
	};
};
const newUser = (user) => {
	return {
		type: "NEW_USER",
		user,
	};
};
export const useUsersList = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const usersAddresses = await api.getUsersAddresses();

				const users = await Promise.all(
					usersAddresses.map((address) => api.getUserInfo(address))
				);
				const validUsers = users
					.filter(
						(user) =>
							user.role !== "4" && user.role !== "5" && user.role !== "6"
					)
					.map(toValidUser);
				dispatch(setUsers(validUsers));
			} catch (e) {
				console.log(e.message);
			}
		};

		getUsers();
	}, []);

	useChangeRoleSubscribe(({ Address: userAddress, role }) =>
		dispatch(changeRole(userAddress, role))
	);
	useNewRoleSubscribe(({ Address: userAddress, role }) =>
		dispatch(newRole(userAddress, role))
	);
	useNewUserSubscribe((user) => dispatch(newUser(user)));

	return [state];
};
