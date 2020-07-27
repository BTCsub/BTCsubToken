pragma solidity ^0.5.0;
import './lib/Oracle/provableAPI_0.5.sol';

contract DataOracle is usingProvable {
    
    string GET_BTC_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/BTC-USD/ticker).price";
    string GET_ETH_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price";
    string GET_BCH_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/BCH-USD/ticker).price";
    string GET_USD_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/USD/ticker).price";
    string GET_TUSD_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/TUSD-USD/ticker).price";
    string GET_BUSD_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/BUSD-USD/ticker).price";
    string GET_XTZ_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/XTZ-USD/ticker).price";
    string GET_COMP_PRICE_QUERY = "json(https://api.pro.coinbase.com/products/COMP-USD/ticker).price";
    
    event LogNewProvableQuery(string description);
    event LogNewProvableResult(string result);

    mapping (bytes32 => bool) public pendingQueries;
    string public result;
        address public owner;

    constructor() public payable {
        provable_setProof(proofType_TLSNotary | proofStorage_IPFS);
        owner = msg.sender;
        provable_setCustomGasPrice(1000000000 wei);
        
    }
    
    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

        function changeOraclizeGasPrice(uint _newGasPrice) external onlyOwner {
        provable_setCustomGasPrice(_newGasPrice);
    }

    function __callback(bytes32 _myid, string memory _result) public {
        require(msg.sender == provable_cbAddress());
        require (pendingQueries[_myid] == true);
        result = _result;
        emit LogNewProvableResult(_result);
        delete pendingQueries[_myid]; // This effectively marks the query id as processed.
    }

    function BTCPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_BTC_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
        function ETHPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_ETH_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
        function BCHPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_BCH_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
        function USDPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_USD_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
    
        function TUSDPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_TUSD_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
        function BUSDPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_BUSD_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
            function XTZPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_XTZ_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
                function COMPPrice() public payable {
        if (provable_getPrice("URL") > msg.value) {
            revert("Provable query was NOT sent, please add some ETH to cover for the query fee!");
        } else {
            emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
            bytes32 queryId = provable_query("URL", GET_COMP_PRICE_QUERY);
            pendingQueries[queryId] = true;
        }
    }
    
    
}