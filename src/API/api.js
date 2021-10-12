import Web3 from "web3";
import { abi, contractAddress } from "../Data/DataForDeploy";
import { hashing } from "../Services/hashing";

let web3;
let contract;
let sender;

export const api = {
	initialWeb3() {
		web3 = new Web3("ws://localhost:8545");
		console.log(web3);
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
	async lockAccount() {
		return await web3.eth.personal.lockAccount(sender);
	},
	async getWalletsAddresses() {
		return await web3.eth.getAccounts();
	},
	async login(login, password) {
		const response = await contract.methods
			.LogIn(login, hashing(password))
			.call({ from: sender });
		return response;
	},
	async registration(fio, login, password) {
		return await contract.methods
			.regUser(fio, login, hashing(password))
			.send({ from: sender });
	},
	async getProfileInfo() {
		return await contract.methods.user(sender).call();
	},
	async getShopProfileInfo() {
		return await contract.methods
			.shops(await contract.methods.AddressToShop(sender).call())
			.call();
	},
	async getUserInfo(userAddress) {
		return await contract.methods.user(userAddress).call();
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
		return await contract.methods.shops(shopId).call();
	},
	async removeShop(shopId) {
		return await contract.methods
			.DeleteShop(shopId)
			.send({ from: sender })
			.on("receipt", (response) => console.log(response));
	},
	async addShop(freeAddressId, city, nameStore, login, password) {
		return await contract.methods
			.AddShop(freeAddressId, city, nameStore, login, hashing(password))
			.send({ from: sender });
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
	async beBuyer() {
		return await contract.methods.BeShoper().send({ from: sender });
	},
	async beSalesman() {
		return await contract.methods.BeSalesman().send({ from: sender });
	},
	async beAdmin() {
		return await contract.methods.BeAdmin().send({ from: sender });
	},
	async beAdminForever() {
		return await contract.methods.RequestToAdmin().send({ from: sender });
	},
	async beBuyerForever() {
		debugger;
		return await contract.methods
			.RequestToShoper()
			.send({ from: sender })
			.on("receipt", console.log);
	},
	async beSalesmanForever(shopId) {
		return await contract.methods
			.RequestToSalesman(+shopId)
			.send({ from: sender })
			.on("receipt", (response) => console.log(response));
	},
	async getUsersAddresses() {
		return await contract.methods.GetUserAddress().call();
	},
	async getFreeAddresses() {
		return await contract.methods.GetFreeAddress().call();
	},
	async getFreeAddress(freeAddressId) {
		return await contract.methods.freeAddress(freeAddressId).call();
	},
	async getBeBuyerRequests() {
		return await contract.methods.GetBeShoperRequest().call();
	},
	async acceptBeBuyerRequest(requestId) {
		return await contract.methods
			.AccRequestToShoper(requestId)
			.send({ from: sender });
	},
	async cancelBeBuyerRequest(requestId) {
		return await contract.methods
			.CancelRequestToShoper(requestId)
			.send({ from: sender });
	},
	async getBeSalesmanRequests() {
		return await contract.methods.GetBeSalesmanRequest().call();
	},
	async acceptBeSalesmanRequest(requestId) {
		return await contract.methods
			.AccRequestToSalesman(requestId)
			.send({ from: sender });
	},
	async cancelBeSalesmanRequest(requestId) {
		return await contract.methods
			.CancelRequestToSalesman(requestId)
			.send({ from: sender });
	},
	async getBeAdminRequests() {
		return await contract.methods.GetBeAdminRequest().call();
	},
	async acceptBeAdminRequest(requestId) {
		return await contract.methods
			.AccRequestToAdmin(requestId)
			.send({ from: sender });
	},
	async cancelBeAdminRequest(requestId) {
		return await contract.methods
			.CancelRequestToAdmin(requestId)
			.send({ from: sender });
	},
	async getBeBuyerRequest(requestId) {
		return await contract.methods.requestToShoper(requestId).call();
	},
	async getBeSalesmanRequest(requestId) {
		return await contract.methods.requestToSalesman(requestId).call();
	},
	async getBeAdminRequest(requestId) {
		return await contract.methods.requestToAdmin(requestId).call();
	},
	async getShopRequestsId() {
		return await contract.methods.GetBankRequestIndexes().call();
	},
	async acceptShopRequest(shopId) {
		return await contract.methods.AccRequestBank(shopId).send({ from: sender });
	},
	async cancelShopRequest(shopId) {
		return await contract.methods
			.CancelRequestBank(shopId)
			.send({ from: sender });
	},
	async requestBank() {
		return await contract.methods.ToBankRequest().send({ from: sender });
	},
	async getBankRequest(shopId) {
		return await contract.methods.BankRequestShop(shopId).call();
	},
	subscribeChangeRole(callback, filter) {
		return contract.events.ChangeRole({ filter }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeNewRole(callback, filter) {
		return contract.events.NewRole({ filter }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeAddShop(callback, filter) {
		return contract.events.AddShopEvent(
			{ filter },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeRemoveShop(callback, filter) {
		return contract.events.RemoveShop({ filter }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeRemoveSalesman(callback, filter) {
		return contract.events.RemoveSalesmans(
			{ filter },
			(error, { returnValues }) => {
				callback(returnValues);
			}
		);
	},
	subscribeNewSalesman(callback, filter) {
		return contract.events.AddSalesman(
			{ filter },
			(error, { returnValues }) => {
				callback(returnValues);
			}
		);
	},
	subscribeNewCAS(callback, filter) {
		return contract.events.NewComplaint(
			{ filter },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeChangeCASMark(callback, filter) {
		return contract.events.MarkComplaint(
			{ filter },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewComment(callback, filter) {
		return contract.events.NewComment({ filter }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeChangeCommentMark(callback, filter) {
		return contract.events.MarkComment(
			{ filter },
			(error, { returnValues }) => {
				console.log(returnValues);
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewUser(callback, filter) {
		return contract.events.NewUser({ filter }, (error, { returnValues }) => {
			if (error === null) {
				callback(returnValues);
			}
		});
	},
	subscribeNewFreeAddress(callback, filter) {
		return contract.events.AddFreeAddress(
			{ filter },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeRemoveFreeAddress(callback, filter) {
		return contract.events.RemoveFreeAddress(
			{ filter },
			(error, { returnValues }) => {
				if (error === null) {
					callback(returnValues);
				}
			}
		);
	},
	subscribeFinishRequest(callback, filter) {
		return contract.events.RequestFinished(
			{ filter },
			(error, { returnValues }) => {
				console.log(error, returnValues);
				if (error === null) {
					console.log(returnValues);
					callback(returnValues);
				}
			}
		);
	},
	subscribeNewRequest(callback, filter) {
		return contract.events.NewRequest({ filter }, (error, { returnValues }) => {
			console.log(error, returnValues);

			if (error === null) {
				console.log(returnValues);
				callback(returnValues);
			}
		});
	},
};
