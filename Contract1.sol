pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
contract Shoping {
    struct User {
        address Address;
        string FIO;
        string login;
        bytes32 password;
        uint role; // 1-покупатель  2-продавец  3-админ  4-поставщик  5-банк  6-магазин
        int shopId;
        bool isSalesman;
        bool isAdmin;
    }
    struct Shop {
        uint Id;
        address payable Address;
        string city;
        address[] salesmans;
        bool haveBankMoney;
    }
    struct Comment {
        uint Id;
        string login;
        string comment;
        address[] likes;
        address[] dislikes;
    }
    struct ComplaintsAndSuggestions {
        uint Id;
        string login;
        string comment;
        uint mark;
        address[] likes;
        address[] dislikes;
    }
    struct Request {
        uint id;
        address Address;
        uint currentRole;
        uint newRole;
        int shopId;//если запрос на повышение до продавца, то id магазина, если нет, то -1
        bool finish;
    }
    //Users
    event NewUser(address user);
    event ChangeRole(address indexed Address, uint role);
    event NewRole(address indexed Address, uint role);
    event RemoveSalesmans(address Address, uint indexed shopId);
    event AddSalesman(address Address, int indexed shopId);
    //Shops
    event AddShopEvent(address Address);
    event RemoveShop(address Address);
    //Complaints
    event NewComplaint(address indexed Address, uint complaintsId);
    event MarkComplaint(address indexed Address, uint complaintsId, uint mark, address senderAddress);
    //Comments
    event NewComment(address indexed Address, uint indexed complaintsId, uint commentId);
    event MarkComment(address indexed Address, uint indexed complaintsId, uint commentId, uint mark, address senderAddress);
    //Request
    event RequestFinished(uint indexed typeCode, uint requestId);// 1 -beBuyer, 2 - beSalesman, 3 - beAdmin
    event NewRequest(uint indexed typeCode, uint requestId);
    //freeAddress
    event AddFreeAddress(uint Address);
    event RemoveFreeAddress(uint Address);

    constructor() public {
        user[0x98ABCBdDb13B61b30205c04B325A2202050d2bBC] = User(0x98ABCBdDb13B61b30205c04B325A2202050d2bBC, "Иванов Иван Иванович", "ivan", keccak256(abi.encodePacked("ivan")), 3, -1, false, true);
        userArray.push(0x98ABCBdDb13B61b30205c04B325A2202050d2bBC);
        user[0x5E0d17253fe14d19FAe6de54C6BFa49B334Bf268] = User(0x5E0d17253fe14d19FAe6de54C6BFa49B334Bf268, "Магазин", "shop", keccak256(abi.encodePacked("shop")), 6, -1, false, false);
        userArray.push(0x5E0d17253fe14d19FAe6de54C6BFa49B334Bf268);
        AddressToShop[0x5E0d17253fe14d19FAe6de54C6BFa49B334Bf268]=shops.length;
        address[] memory startSalesmen = new address[](1);
        startSalesmen[0] = 0x05E20dC1d88dfF98C1c3e9a04d6d571e1e895B71;
        shops.push(Shop(shops.length, 0x5E0d17253fe14d19FAe6de54C6BFa49B334Bf268, "kaluga", startSalesmen, false));
        user[0x05E20dC1d88dfF98C1c3e9a04d6d571e1e895B71] = User(0x05E20dC1d88dfF98C1c3e9a04d6d571e1e895B71, "Продавец Продавцов", "salesman", keccak256(abi.encodePacked("salesman")), 2, 0, true, false);
        userArray.push(0x05E20dC1d88dfF98C1c3e9a04d6d571e1e895B71);
        freeAddress.push(0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC);

    }
    mapping (address => User) public user;

    Shop[] public shops;
    mapping (address => ComplaintsAndSuggestions[]) public bookOfComplaintsAndSuggestions;
    Request[] public requestToShoper;
    Request[] public requestToSalesman;
    Request[] public requestToAdmin;

    mapping (uint => bool) public BankRequestShop;
    mapping (address => uint) public AddressToShop;
    mapping (address => mapping (uint => Comment[])) public comments;
    address payable[] public freeAddress;
    address[] public zeroAddress;
    address[] public userArray;
    uint[] public BankRequestIndexes;

    address payable bankAddress = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
    address payable provider = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;

    modifier IsNotReg() {
        require(user[msg.sender].Address == address(0), "Вы уже зарегистрированы");_;}
    modifier IsNotShop() {
        for (uint256 i=0; i<shops.length; i++) {
            require(msg.sender != shops[i].Address, "Ваш адрес - адрес магазина");
        }
    _;}
    modifier IsStore(address Address) {
        bool flag = false;
        for (uint256 i=0; i<shops.length;i++) {
            if (Address == shops[i].Address) {
                flag=true;
            }
        }
        require(flag==true, "Aдрес не является адресом магазина");
    _;}
    modifier IsShoperOrSalesman() {
        require(user[msg.sender].role ==1 || user[msg.sender].role == 2, "Проверьте вашу роль. Вы не являетесь продавцом или покупателем");
    _;}
    modifier IsAdmin() {
        require(user[msg.sender].role ==3, "Вы не админ");
    _;}
    modifier IsUser() {
        require(user[msg.sender].Address != address(0), "Вы не зарегистрированы");
    _;}
    modifier CheckLogin(string memory login) {
        for (uint256 i=0; i<userArray.length; i++) {
            require(keccak256(abi.encodePacked(login)) != keccak256(abi.encodePacked(user[userArray[i]].login)), "Логие занят");
    }
    _;}
    modifier CheckTheCorrectPassword(bytes32 password) {
        require(
            password != 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470,"Password incorrect");
    _;}
    modifier IsSalesmanOnThisShop(uint shopId) {
        if (user[msg.sender].role == 2) {
            bool flag = false;
            for (uint256 i=0;i<shops[shopId].salesmans.length;i++) {
                if (msg.sender == shops[shopId].salesmans[i]) {
                    flag=true;
                }
            }
        require(flag==true, "Вы не являетесь продавцом этого магазина");
        }
    _;}
    modifier CheckRequestToShoper() {
        for (uint256 i=0; i< requestToShoper.length;i++) {
            if (requestToShoper[i].Address == msg.sender) {
                require(requestToShoper[i].finish == true, "Вы уже отправили заявку");
            }
        }
    _;}
        modifier CheckRequestToSalesman() {
        for (uint256 i=0; i< requestToSalesman.length;i++) {
            if (requestToShoper[i].Address == msg.sender) {
                require(requestToSalesman[i].finish == true, "Вы уже отправили заявку");
            }
        }
    _;}
        modifier CheckRequestToAdmin() {
        for (uint256 i=0; i< requestToAdmin.length;i++) {
            if (requestToAdmin[i].Address == msg.sender) {
                require(requestToAdmin[i].finish == true, "Вы уже отправили заявку");
            }
        }
    _;}
}
