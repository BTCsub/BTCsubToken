pragma solidity >= 0.5.0 < 0.6.0;

import "./provableAPI_0.5.sol";

contract PriceTicker is usingProvable {

    string public priceXETHXXBT;
    string public priceADAETH;
    string public priceETHUSDT;
    string public priceBCHUSD;
    string public priceXTZUSD;
    string public priceCOMPUSD;
    string public priceLTCUSDT;
    string public priceADAUSD;


   enum oraclizeState { ForXETHXXBT, ForADAETH , ForETHUSDT, ForBCHUSD, ForXTZUSD, ForCOMPUSD, ForLTCUSDT, ForADAUSD }
  
      
    struct oraclizeCallback {
            oraclizeState oState;
    }

    mapping (bytes32 => oraclizeCallback) public oraclizeCallbacks;
 
 
   constructor() public payable {
    }

    function __callback( bytes32 myid, string memory result )  public {
        
    require(msg.sender == provable_cbAddress());
    
                oraclizeCallback memory o = oraclizeCallbacks[myid];
      
                 if (o.oState == oraclizeState.ForXETHXXBT ) {
                      
                  priceXETHXXBT = result;
                  
                       }
                  else if(o.oState == oraclizeState.ForADAETH) {
                   priceADAETH = result;
                  
                 }
                   else if(o.oState == oraclizeState.ForETHUSDT) {
                   priceETHUSDT = result;
                   
                 }
                   else if(o.oState == oraclizeState.ForBCHUSD) {
                   priceBCHUSD = result;
                   
                 }
                   else if(o.oState == oraclizeState.ForXTZUSD) {
                   priceXTZUSD = result;
                   
                 }
                   else if(o.oState == oraclizeState.ForCOMPUSD) {
                   priceCOMPUSD = result;
                  
                 }
                   else if(o.oState == oraclizeState.ForLTCUSDT) {
                   priceLTCUSDT = result;
                  
                 }
                   else if(o.oState == oraclizeState.ForADAUSD) {
                   priceADAUSD = result;
                  
                 }
    }
    

   function XETHXXBTPrice()
        public
        payable
    {
        if (provable_getPrice("URL") > address(this).balance) {
           
        } else {
            
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXETHXXBT);
        }
    }
        
          function ADAETHPrice() public payable  {
        if (provable_getPrice("URL") > address(this).balance) {
           
        } else {
          
          bytes32 queryId =  provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ADAETH).result.ADAETH.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADAETH);
        }
          }
        
        
          function ETHUSDTPrice() public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
          
        } else {
            
            bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHUSDT).result.ETHUSDT.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForETHUSDT);
        }
          }
        
        
        function BCHUSDPrice()   public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
            
        } else {
            
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=BCHUSD).result.BCHUSD.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForBCHUSD);
        }
        }
        
        
       function XTZUSDPrice()   public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
          
        } else {
            
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=XTZUSD).result.XTZUSD.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForXTZUSD);
        }}
        
          function COMPUSDPrice()   public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
           
        } else {
            
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=COMPUSD).result.COMPUSD.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForCOMPUSD);
        }}
        
        
          function LTCUSDTPrice()   public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
           
        } else {
           
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=LTCUSDT).result.LTCUSDT.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForLTCUSDT);
        }}
        
             function ADAUSDPrice()   public  payable  {
        if (provable_getPrice("URL") > address(this).balance) {
           
        } else {
           
           bytes32 queryId = provable_query(60, "URL", "json(https://api.kraken.com/0/public/Ticker?pair=ADAUSD).result.ADAUSD.c.0");
            oraclizeCallbacks[queryId] = oraclizeCallback(oraclizeState.ForADAUSD);
        }}
        
    
}

