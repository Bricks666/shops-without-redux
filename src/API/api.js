import Web3 from "web3";
import { abi, contractAddress } from "../Data/DataForDeploy";
import { hashing } from "../Services/hashing";

let web3;
let contract;
let sender;
window.sender = sender;

export const api = {
	initialWeb3() {
		web3 = new Web3("ws://localhost:8545");
		return true;
	},
	async connectContract() {
		contract = await new web3.eth.Contract(abi, contractAddress);
		console.log(contract);

		return true;
	},
	async unlockAccount(address, password) {
		await web3.eth.personal.unlockAccount(address, password);

		sender = address;

		return true;
	},
	async getWalletsAddresses() {
		return await web3.eth.getAccounts();
	},
	async login(login, password) {
		const response = await contract.methods
			.LogIn(hashing(login), hashing(password))
			.call({ from: sender });
		return response;
	},
	async registration(fio, login, password) {
		return await contract.methods
			.regUser(fio, hashing(login), hashing(password))
			.send({ from: sender });
	},
	async getProfileInfo() {
		return await contract.methods.user(sender).call();
	},
	async getBalance() {
		return (await web3.eth.getBalance(sender)) / 10 ** 18;
	},
	async getShops() {
		return await contract.methods.GetShops().call();
	},
	async getShopIdByAddress(shopAddress) {
		return await contract.methods.AddressToShop(shopAddress).call();
	},
	async getShop(shopId) {
		return await contract.methods.shop(shopId).call();
	},
	async getCAS(shopAddress) {
		return await contract.methods
			.GetShopComplaintsAndSuggestion(shopAddress)
			.call();
	},
	async getCASById(shopAddress, CASId) {
		return await contract.methods
			.bookOfComplaintsAndSuggestions(shopAddress, CASId)
			.call();
	},
	async likeCAS(shopAddress, CASId) {
		return await contract.methods
			.LikeComplaints(shopAddress, CASId)
			.send({ from: sender });
	},
	async dislikeCAS(shopAddress, CASId) {
		return await contract.methods
			.DisllikeComplaints(shopAddress, CASId)
			.send({ from: sender });
	},
	async addNewCAS(shopAddress, CAS, mark) {
		return await contract.methods
			.addComplaints(shopAddress, CAS, mark)
			.send({ from: sender });
	},
	async getComments(shopAddress, CASId) {
		return await contract.methods.GetComments(shopAddress, CASId).call();
	},
	async getCommentById(shopAddress, CASId, commentId) {
		return await contract.methods
			.comments(shopAddress, CASId, commentId)
			.call();
	},
	async likeComment(shopAddress, CASId, commentId) {
		return await contract.methods
			.LikeComments(shopAddress, CASId, commentId)
			.send({ from: sender });
	},
	async dislikeComment(shopAddress, CASId, commentId) {
		return await contract.methods
			.DislikeComments(shopAddress, CASId, commentId)
			.send({ from: sender });
	},
	async addNewComment(shopAddress, CASId, comment) {
		return await contract.methods
			.addComment(shopAddress, CASId, comment)
			.send({ from: sender });
	},
	beBuyer() {
		contract.methods.BeShoper().send({ from: sender });
	},
	beSalesman() {
		contract.methods.BeSalesman().send({ from: sender });
	},
	beAdmin() {
		contract.methods.BeAdmin().send({ from: sender });
	},
	beBuyerForever() {
		contract.methods.RequestToShoper().send({ from: sender });
	},
	beSalesmanForever(shopId) {
		contract.methods.RequestToSalesman(shopId).send({ from: sender });
	},
	subscribeChangeRole(callback, filters) {
		return contract.events.ChangeRole(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewRole(callback, filters) {
		return contract.events.NewRole({ filters }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeAddShop(callback, filters) {
		return contract.events.AddShopEvent(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeRemoveShop(callback, filters) {
		return contract.events.RemoveShop(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewCAS(callback, filters) {
		return contract.events.NewComplaint(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeChangeCASMark(callback, filters) {
		return contract.events.MarkComplaint(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewComment(callback, filters) {
		return contract.events.NewComment(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeChangeCommentMark(callback, filters) {
		return contract.events.MarkComment(
			{ filters },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
};

window.api = api;
