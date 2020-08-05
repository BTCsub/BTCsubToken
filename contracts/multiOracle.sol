pragma solidity ^0.4.16;

import "github.com/oraclize/ethereum-api/oraclizeAPI_0.4.sol";

contract TestOraclizeCall is usingOraclize {


    string public priceXETHXXBT;
    string public priceADAETH;
    string public priceETHUSDT;
    string public priceBCHUSD;
    string public priceXTZUSD;
    string public priceCOMPUSD;
    string public priceLTCUSDT;
    string public priceADAUSD;
    
    
      // oraclize callback types:
      enum oraclizeState { ForXETHXXBT, ForADAETH , ForETHUSDT, ForBCHUSD, ForXTZUSD, ForCOMPUSD, ForLTCUSDT, ForADAUSD }

   
  //Events
      event LOG_XETHXXBT(
                string result
      );

      event LOG_ADAETH(
                string result
      );
      
       event LOG_ETHUSDT(
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
      

       // the oraclize callback structure: we use several oraclize calls.
       // all oraclize calls will result in a common callback to __callback(...).
       // to keep track of the different querys we have to introduce this struct.
       
       
       
      struct oraclizeCallback {
            // for which purpose did we call? {ForUSD | ForDistance}
            oraclizeState oState;
      }
      // Lookup state from queryIds
      mapping (bytes32 => oraclizeCallback) public oraclizeCallbacks;

    
      // constructor
      function TestOraclizeCall() {
              OAR = OraclizeAddrResolverI(0x5049063e4a7704ac155e4f1f42a4954bbef5bbde);
             
      }
      //Function for distance retrieval
      function XETHXXBTPrice() payable returns(bool sufficient) {
           
            bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXETHXXBT);
            return true;
      }

      function ADAETHPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=ADAETH).result.ADAETH.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADAETH);
         return true;
      }
      
       function ETHUSDTPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=ETHUSDT).result.ETHUSDT.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForETHUSDT);
         return true;
      }
      
      
       function BCHUSDPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=BCHUSD).result.BCHUSD.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBCHUSD);
         return true;
      }
      
       function XTZUSDPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=XTZUSD).result.XTZUSD.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXTZUSD);
         return true;
      }
      
       function COMPUSDPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=COMPUSD).result.COMPUSD.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForCOMPUSD);
         return true;
      }
      
       function LTCUSDTPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=LTCUSDT).result.LTCUSDT.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForLTCUSDT);
         return true;
      }
      
         function ADAUSDPrice() payable returns(bool sufficient) {
          
         bytes32 queryId =  oraclize_query("URL","json(https://api.kraken.com/0/public/Ticker?pair=ADAUSD).result.ADAUSD.c.0");
         oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADAUSD);
         return true;
      }


      //Function callback
      function __callback(bytes32 myid, string result) {

                 if (msg.sender != oraclize_cbAddress()) throw;
                 oraclizeCallback memory o = oraclizeCallbacks[myid];
                 
                 
                 if (o.oState == oraclizeState.ForXETHXXBT) {
                     priceXETHXXBT = result;
                     LOG_XETHXXBT(result); 
                  }
                  else if(o.oState == oraclizeState.ForADAETH) {
                   priceADAETH = result;
                   LOG_ADAETH(result);
                 }
                   else if(o.oState == oraclizeState.ForETHUSDT) {
                   priceETHUSDT = result;
                   LOG_ETHUSDT(result);
                 }
                   else if(o.oState == oraclizeState.ForBCHUSD) {
                   priceBCHUSD = result;
                   LOG_BCHUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForXTZUSD) {
                   priceXTZUSD = result;
                   LOG_XTZUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForCOMPUSD) {
                   priceCOMPUSD = result;
                   LOG_COMPUSD(result);
                 }
                   else if(o.oState == oraclizeState.ForLTCUSDT) {
                   priceLTCUSDT = result;
                   LOG_LTCUSDT(result);
                 }
                   else if(o.oState == oraclizeState.ForADAUSD) {
                   priceADAUSD = result;
                   LOG_ADAUSD(result);
                 }
      }
}