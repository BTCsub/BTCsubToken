pragma solidity >=0.5.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}
interface IGateway {
    function mint(bytes32 _pHash, uint256 _amount, bytes32 _nHash, bytes calldata _sig) external returns (uint256);
    function burn(bytes calldata _to, uint256 _amount) external returns (uint256);
}
interface IGatewayRegistry {
    function getGatewayBySymbol(string calldata _tokenSymbol) external view returns (IGateway);
    function getTokenBySymbol(string calldata _tokenSymbol) external view returns (IERC20);
}
contract Holder {
    IGatewayRegistry public registry;
    event Deposit(uint256 _amount, bytes _msg);
    event Withdrawal(bytes _to, uint256 _amount, bytes _msg);
    constructor(IGatewayRegistry _registry) public {
        registry = _registry;
    }
    function deposit(
        // Parameters from users
        bytes calldata _msg,
        // Parameters from Darknodes
        uint256        _amount,
        bytes32        _nHash,
        bytes calldata _sig
    ) external {
        bytes32 pHash = keccak256(abi.encode(_msg));
        uint256 mintedAmount = registry.getGatewayBySymbol("BTC").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("ETH").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("BCH").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("XTZ").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("COMP").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("USDT").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("TUSD").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("BUSD").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("ADA").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
        uint256 mintedAmount = registry.getGatewayBySymbol("LTC").mint(pHash, _amount, _nHash, _sig);
        emit Deposit(mintedAmount, _msg);
    }
    function withdraw(bytes calldata _msg, bytes calldata _to, uint256 _amount) external {
        uint256 burnedAmount = registry.getGatewayBySymbol("BTC").burn(_to, _amount);
        emit Withdrawal(_to, burnedAmount, _msg);
    }
    function balance() public view returns (uint256) {
        return registry.getTokenBySymbol("BTC").balanceOf(address(this));
        return registry.getTokenBySymbol("ETH").balanceOf(address(this));
        return registry.getTokenBySymbol("BCH").balanceOf(address(this));
        return registry.getTokenBySymbol("TUSD").balanceOf(address(this));
        return registry.getTokenBySymbol("BUSD").balanceOf(address(this));
        return registry.getTokenBySymbol("USDT").balanceOf(address(this));
        return registry.getTokenBySymbol("LTC").balanceOf(address(this));
        return registry.getTokenBySymbol("ADA").balanceOf(address(this));
        return registry.getTokenBySymbol("COMP").balanceOf(address(this));
        return registry.getTokenBySymbol("XTZ").balanceOf(address(this));
    }
}