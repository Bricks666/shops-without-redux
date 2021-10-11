pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import {Shoping} from './Shoping1.sol';


contract Shoping2 is Shoping{
    function regUser(string memory FIO, bytes32 login, bytes32 password) public IsNotReg {
        user[msg.sender] = User(msg.sender, FIO, login, password, 1, -1, false, false);
        userArray.push(msg.sender);
        emit NewUser(msg.sender);
    }
    function LogIn(bytes32 login, bytes32 password) public view returns(bool){
        require(login == user[msg.sender].login, "Проверьте логин");
        require(password == user[msg.sender].password, "Проверьте пароль");
        return(true);
    }
    function addComplaints(address Address, string memory comment, uint mark) public IsUser IsStore(Address) IsNotShop{
        require(user[msg.sender].role == 1, "Оставлять записи могут только покупатели");
            bookOfComplaintsAndSuggestions[Address].push(ComplaintsAndSuggestions(
            bookOfComplaintsAndSuggestions[Address].length,
            user[msg.sender].login,
            comment,
            mark,
            zeroAddress,
            zeroAddress
        )
        );
        emit NewComplaint(Address, bookOfComplaintsAndSuggestions[Address].length-1);
    }
    function LikeComplaints(address Address, uint complaintsId) public CheckLike(Address, complaintsId) CheckDislike(Address, complaintsId) IsShoperOrSalesman IsSalesmanOnThisShop(AddressToShop[Address]) {
        require(user[msg.sender].role != 6, "Ваш адрес является адресом магазина");
        bookOfComplaintsAndSuggestions[Address][complaintsId].likes.push(msg.sender);
        emit MarkComplaint(Address, complaintsId, 1, msg.sender);
    }
        function DisllikeComplaints(address Address, uint complaintsId) public CheckLike(Address, complaintsId) CheckDislike(Address, complaintsId) IsShoperOrSalesman IsSalesmanOnThisShop(AddressToShop[Address]) {
        require(user[msg.sender].role != 6, "Ваш адрес является адресом магазина");
        bookOfComplaintsAndSuggestions[Address][complaintsId].dislikes.push(msg.sender);
        emit MarkComplaint(Address, complaintsId, 0, msg.sender);
    }
    function addComment(address Address, uint complaintsId, string memory comment) public IsSalesmanOnThisShop(AddressToShop[Address]){
        require(user[msg.sender].role == 1 || user[msg.sender].role == 2, "Оставлять ответы на комментарии могут только покупатели и продавцы данного магазина. Проверьте свою роль и попробуйте еще раз");
        comments[Address][complaintsId].push(Comment(comments[Address][complaintsId].length, user[msg.sender].login, comment, zeroAddress, zeroAddress));
        emit NewComment(Address, complaintsId, comments[Address][complaintsId].length-1);
    }
    function LikeComments(address Address, uint complaintsId, uint commentId) public CheckLikeComment(Address, complaintsId, commentId) CheckDislikeComment(Address, complaintsId, commentId) IsShoperOrSalesman IsSalesmanOnThisShop(AddressToShop[Address]) {
        require(user[msg.sender].role != 6, "Ваш адрес является адресом магазина");
        comments[Address][complaintsId][commentId].likes.push(msg.sender);
        emit MarkComment(Address, complaintsId, commentId, 1, msg.sender);
    }
    function DislikeComments(address Address, uint complaintsId, uint commentId) public CheckLikeComment(Address, complaintsId, commentId) CheckDislikeComment(Address, complaintsId, commentId) IsShoperOrSalesman IsSalesmanOnThisShop(AddressToShop[Address]) returns(string memory Memor){
        require(user[msg.sender].role != 6, "Ваш адрес является адресом магазина");
        comments[Address][complaintsId][commentId].dislikes.push(msg.sender);
        emit MarkComment(Address, complaintsId, commentId, 0, msg.sender);
        return(Memor);
    }
    function BeAdmin() IsUser public {
        require(user[msg.sender].role == 1 && user[msg.sender].isAdmin == true, "Вы не админ");
        user[msg.sender].role = 3;
    emit ChangeRole(msg.sender, 3);
    }
    function BeSalesman() IsUser public {
        require(user[msg.sender].role == 1 && user[msg.sender].isSalesman == true, "Вы не продавец");
        user[msg.sender].role = 2;
    emit ChangeRole(msg.sender, 2);
    }
    function BeShoper() IsUser public {
        require(user[msg.sender].role == 2 || user[msg.sender].role == 3, "Вы уже покупатель");
        user[msg.sender].role = 1;
    emit ChangeRole(msg.sender, 1);
    }
    function RequestToAdmin() IsUser CheckRequestToAdmin public {
        require(user[msg.sender].isAdmin==false, "Вы уже админ");
        requestToAdmin.push(Request(requestToAdmin.length, msg.sender, user[msg.sender].role, 3, -1, false));
        emit NewRequest("BeAdmin",requestToAdmin.length-1);
    }
    function RequestToSalesman(uint shopId) IsUser CheckRequestToSalesman public {
        require(user[msg.sender].role == 1, "Вы не покупатель. проврьте свойю роль");
        require(user[msg.sender].isSalesman==false, "Вы уже продавец");
        requestToSalesman.push(Request(requestToSalesman.length, msg.sender, user[msg.sender].role, 2, int(shopId), false));
        emit NewRequest("BeSalesman",requestToSalesman.length-1);
    }
    function RequestToShoper() IsUser CheckRequestToShoper public {
        require(user[msg.sender].isSalesman!=false, "Вы не продавец");
        requestToAdmin.push(Request(requestToAdmin.length, msg.sender, user[msg.sender].role, 1, -1, false));
        emit NewRequest("BeShoper",requestToShoper.length-1);
    }
    function AccRequestToAdmin(uint requestId) IsAdmin public {
        require(requestToAdmin[requestId].finish!=true, "Заявка уже обработана");
        user[requestToAdmin[requestId].Address].role=3;
        user[requestToAdmin[requestId].Address].isAdmin = true;
        requestToAdmin[requestId].finish = true;
        emit RequestFinished("BeAdmin", requestId);
        emit NewRole(requestToAdmin[requestId].Address, 3);
    }
    function AccRequestToSalesman(uint requestId) IsAdmin public {
        require(requestToSalesman[requestId].finish!=true, "Заявка уже обработана");
        user[requestToSalesman[requestId].Address].role=2;
        user[requestToSalesman[requestId].Address].isSalesman = true;
        requestToSalesman[requestId].finish = true;
        shops[(uint(requestToSalesman[requestId].shopId))].salesmans.push(requestToSalesman[requestId].Address);
        user[requestToSalesman[requestId].Address].shopId = requestToSalesman[requestId].shopId;
        emit NewRole(requestToAdmin[requestId].Address, 2);
        emit RequestFinished("BeSalesman", requestId);
        emit AddSalesman(requestToSalesman[requestId].Address, requestToSalesman[requestId].shopId);
        emit NewRole(requestToSalesman[requestId].Address, 2);
    }
    function AccRequestToShoper(uint requestId) IsAdmin public {
        require(requestToShoper[requestId].finish!=true, "Заявка уже обработана");
        user[requestToShoper[requestId].Address].role=1;
        user[requestToShoper[requestId].Address].isSalesman = false;
        requestToShoper[requestId].finish = true;
        emit RequestFinished("BeShoper", requestId);
        emit NewRole(requestToSalesman[requestId].Address, 1);
        emit RemoveSalesmans(requestToShoper[requestId].Address, uint(user[msg.sender].shopId));
    }
    function CancelRequestToAdmin(uint requestId) IsAdmin public {
        require(requestToAdmin[requestId].finish != true, "Заявка уже обработана");
        requestToAdmin[requestId].finish = true;
        emit RequestFinished("BeAdmin", requestId);
    }
    function CancelRequestToShoper(uint requestId) IsAdmin public {
        require(requestToShoper[requestId].finish != true, "Заявка уже обработана");
        requestToShoper[requestId].finish = true;
        emit RequestFinished("BeShoper", requestId);
    }
    function CancelRequestToSalesman(uint requestId) IsAdmin public {
        require(requestToSalesman[requestId].finish != true, "Заявка уже обработана");
        requestToSalesman[requestId].finish = true;
        emit RequestFinished("BeSalesman", requestId);
    }
    function ShowSalesmansOfStore(uint shopId) public view returns(address [] memory) {
        return(shops[shopId].salesmans);
    }
    function DeleteSalesmans(Shop memory deleteShop) private {
        for (uint i=0;i<shops.length;i++) {
            user[deleteShop.salesmans[i]].isSalesman = false;
            user[deleteShop.salesmans[i]].role = 1;
            emit NewRole(user[deleteShop.salesmans[i]].Address, 1);
        }
    }
    function AddShop(uint freeAddressId, string memory city, string memory nameStore, bytes32 login, bytes32 password) IsAdmin public{
        require(user[freeAddress[freeAddressId]].Address == address(0), "Данный адрес занят");
        user[freeAddress[freeAddressId]]=User(freeAddress[freeAddressId], nameStore, login, password, 6, -1, false, false);
        shops.push(Shop(shops.length, freeAddress[freeAddressId], city, zeroAddress, false));
        AddressToShop[freeAddress[freeAddressId]]=shops.length-1;
        emit AddShopEvent(freeAddress[freeAddressId]);
        delete freeAddress[freeAddressId];
        emit RemoveFreeAddress(freeAddressId);
    }
    function DeleteShop(uint shopId) public IsAdmin {
        require(shops[shopId].Address != address(0), "Несуществующий магазин");
        DeleteSalesmans(shops[shopId]);
        freeAddress.push(shops[shopId].Address);
        delete user[shops[shopId].Address];
        emit RemoveShop(shops[shopId].Address);
        emit AddFreeAddress(freeAddress.length-1);
        delete shops[shopId];
    }
/*    function ToBankRequest() public IsStore(msg.sender){
        require(shops[AddressToShop[msg.sender]].haveBankMoney == false, "Вы уже занимали деньги у банка");
        require(BankRequestShop[AddressToShop[msg.sender]]==false, "Вы уже подавали заявку");
        BankRequestShop[AddressToShop[msg.sender]]=true;
        BankRequestIndexes.push(AddressToShop[msg.sender]);
    }
    function AccRequestBank(uint shopId) public payable {
        require(msg.sender == bankAddress, "Вы не являетесь банком");
        require(shops[shopId].haveBankMoney == false, "Магазин уже получил деньги от банка");
        require(BankRequestShop[shopId] == true, "Магазин не отправлял запрос");
        require(msg.sender.balance >=1000, "Недостаточно средств");
        shops[shopId].haveBankMoney = true;
        shops[shopId].Address.transfer(msg.value);
    }*/
/*    function CancelRequestBank(uint shopId) public {
        require(msg.sender == bankAddress, "Вы не являетесь банком");
        BankRequestShop[shopId]=false;
    }*/
    function GetShops() public view returns(Shop[] memory){
        return shops;
    }
    function GetShopComplaintsAndSuggestion(address Address) public view returns (ComplaintsAndSuggestions[] memory){
        return bookOfComplaintsAndSuggestions[Address];
    }
    function GetBeSalesmanRequest() public view returns(Request[] memory){
        return requestToSalesman;
    }
    function GetBeShoperRequest() public view returns(Request[] memory){
        return requestToShoper;
    }
    function GetBeAdminRequest() public view returns(Request[] memory){
        return requestToAdmin;
    }
    function GetUserAddress() public view returns(address[] memory){
        return userArray;
    }
    function GetFreeAddress() public view returns(address payable[] memory) {
        return freeAddress;
    }
    function GetComments(address shopAddress, uint CASId) external view returns(Comment[] memory) {
        return comments[shopAddress][CASId];
    }
/*    function GetBankRequestIndexes() public view returns(uint[] memory){
        return BankRequestIndexes;
    }*/
}
