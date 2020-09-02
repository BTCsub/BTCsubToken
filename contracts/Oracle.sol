pragma solidity >= 0.5.0 < 0.6.0;

import "https://github.com/djuanit0x/provable-bitcoin-price/blob/master/contracts/provableAPI_0.5.sol";

interface IGasToken {
    function freeFromUpTo(uint256) external returns (uint256);
}
contract Oracle is usingProvable  {

    bytes32 public wBTC;
    bytes32 public TUSD;
    bytes32 public ETH;
    bytes32 public sBCH;
    bytes32 public sXTZ;
    bytes32 public COMP;
    bytes32 public sLTC;
    bytes32 public sADA;
    bytes32 public BUSD;
    bytes32 public USDC;
    bytes32 public DAI;
    
    
      // oraclize callback types:
      enum oraclizeState { ForwBTC, ForTUSD , ForETH, ForBCH, ForXTZ, ForCOMP, ForLTC, ForADA, ForBUSD, ForUSDC, ForDAI }

   
  //Events
      event LOG_wBTC(
                bytes32 result
      );
      
      event LOG_USDC(
                bytes32 result
      );

      event LOG_TUSD(
                bytes32 result
      );
      
       event LOG_ETHUSD(
                bytes32 result
      );

      event LOG_BCHUSD(
                bytes32 result
      );
      
       event LOG_XTZUSD(
                bytes32 result
      );

      event LOG_COMPUSD(
                bytes32 result
      );
      
       event LOG_LTCUSDT(
                bytes32 result
      );

      event LOG_ADAUSD(
                bytes32 result
      );
      
      event LOG_BUSD(
                bytes32 result
      );
      
      event LOG_DAI(
                bytes32 result
      );
      

      struct oraclizeCallback {
            // for which purpose did we call? {ForUSD | ForDistance}
            oraclizeState oState;
      }
      // Lookup state from queryIds
      mapping (bytes32 => oraclizeCallback) public oraclizeCallbacks;
      address public owner;

    uint constant CUSTOM_GASLIMIT = 10000;
    
      // constructor
      constructor() public {
              owner = msg.sender;
      }
    
     // @dev Address of the gas token used to refund gas (default: CHI). 
     IGasToken private chi = IGasToken(0x0000000000004946c0e9F43F4Dee607b0eF1fA1c);
       /// @notice Refunds gas based on the amount of gas spent in the transaction and the gas token parameters.
    modifier discountCHI {
    uint256 gasStart = gasleft();
    _;
    uint256 gasSpent = 21000 + gasStart - gasleft() + 16 * msg.data.length;
    chi.freeFromUpTo((gasSpent + 14154) / 41947);
}

    
      //Function for distance retrieval
      function wBTCPrice() public payable returns(bool sufficient) {
           
            bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&vs_currencies=USD",CUSTOM_GASLIMIT);
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForwBTC);
            return true;
      }

      function TUSDPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x0000000000085d4780b73119b644ae5ecd22b376&vs_currencies=USD", CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForTUSD);
         return true;
      }
      
      function USDCPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForUSDC);
         return true;
      }
      
      function BUSDPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x4fabb145d64652a948d72533023f6e7a623c7c53&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBUSD);
         return true;
      }
      
       function ETHPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForETH);
         return true;
      }
      
      
       function sBCHPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x36a2422a863d5b950882190ff5433e513413343a&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBCH);
         return true;
      }
      
       function sXTZPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xf45b14ddabf0f0e275e215b94dd24ae013a27f12&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXTZ);
         return true;
      }
      
       function COMPPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xc00e94cb662c3520282e6f5717214004a7f26888&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForCOMP);
         return true;
      }
      
       function sLTCPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xc14103c2141e842e228fbac594579e798616ce7a&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForLTC);
         return true;
      }
      
        function sADAPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xe36e2d3c7c34281fa3bc737950a68571736880a1&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADA);
         return true;
      }
      
      function DAIPrice() public payable returns(bool sufficient) {
          
         bytes32 queryId =  provable_query("URL","https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x6b175474e89094c44da98b954eedeac495271d0f&vs_currencies=USD",CUSTOM_GASLIMIT);
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForDAI);
         return true;
      }


      //Function callback
      function __callback(bytes32 myid, bytes32 result) internal {

                 if (msg.sender != provable_cbAddress()) revert();
                 oraclizeCallback memory o = oraclizeCallbacks[myid];
                 
                 
                 if (o.oState == oraclizeState.ForwBTC) {
                     wBTC = result;
                     emit LOG_wBTC(result); 
                  }
                  else if(o.oState == oraclizeState.ForTUSD) {
                   TUSD = result;
                   emit LOG_TUSD(result);
                 }
                 else if(o.oState == oraclizeState.ForUSDC) {
                   USDC = result;
                   emit LOG_USDC(result);
                 }
                   else if(o.oState == oraclizeState.ForETH) {
                   ETH = result;
                   emit LOG_ETHUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForBCH) {
                   sBCH = result;
                   emit LOG_BCHUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForXTZ) {
                   sXTZ = result;
                   emit LOG_XTZUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForCOMP) {
                   COMP = result;
                   emit LOG_COMPUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForLTC) {
                   sLTC = result;
                   emit LOG_LTCUSDT(result);
                 }
                   else if(o.oState == oraclizeState.ForBUSD) {
                   BUSD = result;
                   emit LOG_BUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForADA) {
                   sADA = result;
                   emit LOG_ADAUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForADA) {
                   sADA = result;
                   emit LOG_DAI(result);
                 }
      }
}