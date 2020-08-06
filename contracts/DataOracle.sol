pragma solidity >= 0.5.0 < 0.6.0;

import "./lib/Oracle/provableAPI.sol";

contract DataOracle is usingProvable  {


    string public priceBTCUSD;
    string public priceTUSD;
    string public priceETHUSDT;
    string public priceBCHUSD;
    string public priceXTZUSD;
    string public priceCOMPUSD;
    string public priceLTCUSDT;
    string public priceADAUSD;
    string public priceBUSD;
    string public priceUSD;
    
      // oraclize callback types:
      enum oraclizeState { ForBTC, ForTUSD , ForETH, ForBCH, ForXTZ, ForCOMP, ForLTC, ForADA, ForBUSD, ForUSD }

   
  //Events
      event LOG_BTCUSD(
                string result
      );
      
      event LOG_USD(
                string result
      );

      event LOG_TUSD(
                string result
      );
      
       event LOG_ETHUSD(
                string result
      );

      event LOG_BCHUSD(
                string result
      );
      
       event LOG_XTZUSD(
                string result
      );

      event LOG_COMPUSD(
                string result
      );
      
       event LOG_LTCUSDT(
                string result
      );

      event LOG_ADAUSD(
                string result
      );
      
      event LOG_BUSD(
                string result
      );
      

       // the oraclize callback structure: we use several oraclize calls.
       // all oraclize calls will result in a common callback to __callback(...).
       // to keep track of the different querys we have to introduce this struct.
       
       
       
      struct oraclizeCallback {
            // for which purpose did we call? {ForUSD | ForDistance}
            oraclizeState oState;
      }
      // Lookup state from queryIds
      mapping (bytes32 => oraclizeCallback) public oraclizeCallbacks;
      address public owner;
      
          modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    function changeOraclizeGasPrice(uint _newGasPrice) external onlyOwner {
        provable_setCustomGasPrice(_newGasPrice);
    }

    
      // constructor
      constructor() public {
              owner = msg.sender;
             
      }
      //Function for distance retrieval
      function BTCPrice() public payable returns(bool sufficient) {
           
            bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/BTC-USD/ticker).price");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBTC);
            return true;
      }

      function TUSDPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/TUSD-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForTUSD);
         return true;
      }
      
      function USDPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/USD-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForUSD);
         return true;
      }
      
      function BUSDPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/BUSD-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBUSD);
         return true;
      }
      
       function ETHTPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForETH);
         return true;
      }
      
      
       function BCHPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/BCH-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBCH);
         return true;
      }
      
       function XTZPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://min-api.cryptocompare.com/data/price?fsym=TUSD&tsyms=USD).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXTZ);
         return true;
      }
      
       function COMPPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/COMP-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForCOMP);
         return true;
      }
      
       function LTCTPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/LTC-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForLTC);
         return true;
      }
      
         function ADAPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","json(https://api.pro.coinbase.com/products/ADA-USD/ticker).price");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADA);
         return true;
      }


      //Function callback
      function __callback(bytes32 myid, string memory result) public {

                 if (msg.sender != provable_cbAddress()) revert();
                 oraclizeCallback memory o = oraclizeCallbacks[myid];
                 
                 
                 if (o.oState == oraclizeState.ForBTC) {
                     priceBTCUSD = result;
                     emit LOG_BTCUSD(result); 
                  }
                  else if(o.oState == oraclizeState.ForTUSD) {
                   priceTUSD = result;
                   emit LOG_TUSD(result);
                 }
                 else if(o.oState == oraclizeState.ForUSD) {
                   priceUSD = result;
                   emit LOG_USD(result);
                 }
                   else if(o.oState == oraclizeState.ForETH) {
                   priceETHUSDT = result;
                   emit LOG_ETHUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForBCH) {
                   priceBCHUSD = result;
                   emit LOG_BCHUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForXTZ) {
                   priceXTZUSD = result;
                   emit LOG_XTZUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForCOMP) {
                   priceCOMPUSD = result;
                   emit LOG_COMPUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForLTC) {
                   priceLTCUSDT = result;
                   emit LOG_LTCUSDT(result);
                 }
                 
                   else if(o.oState == oraclizeState.ForBUSD) {
                   priceBUSD = result;
                   emit LOG_BUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForADA) {
                   priceADAUSD = result;
                   emit LOG_ADAUSD(result);
                 }
      }
}