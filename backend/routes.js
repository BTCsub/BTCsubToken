const express = require('express');
// var contract = require("@truffle/contract");
const router = new express.Router();
var CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var solc = require("solc");
const EthereumTx = require("ethereumjs-tx");
var child_process = require('child_process');
const Key = require('./config')
const simpleStorageInterface = require("../build/contracts/PriceTicker.json");


const XETHXXBTPriceInfo = require("../backend/model/price");
const ADAETHPriceInfo = require("../backend/model/price2");
const ETHUSDTPriceInfo = require("../backend/model/price3");
const sBCHPriceInfo = require("../backend/model/price4");
const XTZUSDPriceInfo = require("../backend/model/price5");
const COMPUSDPriceInfo = require("../backend/model/price6");
const LTCUSDTPriceInfo = require("../backend/model/price7");
const ADAUSDPriceInfo = require("../backend/model/price8");



var privateKey = new Buffer(Key.privateKey, 'hex')


var Web3 = require("web3");
const { yellow } = require('color-name');
// //set url of node as provider
var web3;
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0f333401437149e28c3696b36eb02f93"));
  web3.eth.net.getPeerCount().then(console.log);
}
// check the current block number and network type

web3.eth.getBlockNumber().then(console.log);
web3.eth.net.getNetworkType()
  .then(console.log);

var timeIntervalTUSDPriceCallOracle;
var timeIntervalforCallOracle;
var timeIntervalUSDCPriceCallOracle;
var timeIntervalsBCHPriceCallOracle;
var timeIntervalXTZPriceCallOracle;
var timeIntervalCOMPPriceCallOracle;
var timeIntervaSLTCPriceCallOracle;
var timeIntervalsADAPriceCallOracle;
var timeIntervalCOMPPriceCallOracle;

  //------------------------------------------------------wBTPrice ----------------------------------------------//
   function wBTCPrice(){   
    web3.eth.defaultAccount = Key.fromAddress;
  
    web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
      var contractInstance = new web3.eth.Contract(
        Key.interface,
        Key.contractAddress
      );
      let encodedABI = contractInstance.methods.wBTCPrice().encodeABI();
  
      let rawTx = {
        nonce: web3.utils.toHex(txCount),
        from: web3.eth.defaultAccount,
        to: Key.contractAddress,
        gasLimit: '0x3d0900',
        gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
        chainId: '0x04',
        data: encodedABI,
        value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
      };
  
      var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
  
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
          console.log(err)
        } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to wBTCPrice-Price Initiated")
          time = setInterval(fetchBTCPrice,50000)
        }       
      });
    })
   }
   timeIntervalforCallOracle = setInterval(wBTCPrice,100000)

  
  
  
   async function fetchBTCPrice(){
    web3.eth.defaultAccount = Key.fromAddress;
    var contractInstance = new web3.eth.Contract(
      Key.interface, Key.contractAddress, {
      from: web3.eth.defaultAccount,
      gasPrice: "0"
    }
    );
    try {
      contractInstance.methods.wBTC().call().then(async result => {      
        var x = JSON.parse(result)  
        const y = x["0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"].usd;
        var price = new XETHXXBTPriceInfo({ priceXETHXXBT : y}) ;        
     
          
        const data = await price.save();         
        var v1 = await XETHXXBTPriceInfo.find()
        .limit(2)
        .sort({ "_id": -1 })        
      

          
          var variance = (y - v1[1].priceXETHXXBT)/v1[1].priceXETHXXBT*100.00; 
          console.log("Current wBTCrice ====>" ,y, "Variance ====>" ,variance)   
          if (variance < -3 || variance > 0.0000003) {
            console.log("Perform swap needed")
            child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
              console.log(`${stdout}`);
              console.log(`${stderr}`);
              if (error !== null) {
                  console.log(`exec error: ${error}`);
              }
          });
          
          } else if (variance === 0){
            console.log("No Perform Swap")
            if (variance < -3 || variance > 0.0000003) {
              console.log("Perform swap needed")
              child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
                console.log(`${stdout}`);
                console.log(`${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
            
          } else {
            console.log("No swap needed")
          }
          }
      })
    } catch (e) {
      console.log(e)
    }
  }
  



//------------------------------------------------------TUSDPrice ----------------------------------------------//

function TUSDPrice(){   
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.TUSDPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to TUSDPrice Initiated")
          time = setInterval(fetchTUSD,50000)
      }     
    });
  })
}

timeIntervalTUSDPriceCallOracle = setInterval(TUSDPrice,200000)


async function fetchTUSD(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.TUSD().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0x0000000000085d4780b73119b644ae5ecd22b376"].usd;
      var price = new ADAETHPriceInfo({ priceADAETH : y})
      const data = await price.save();         
      var v1 = await ADAETHPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
      
        var variance = (y - v1[1].priceADAETH)/v1[1].priceADAETH*100.00;     
        console.log("Current  TUSD Price ====>" ,y, "Variance ====>" ,variance)      
        if (variance < -3 || variance > 0.0000003) {
          console.log("Perform swap needed")
        
        } else if (variance === 0){
          console.log("No Perform Swap")
          
        } else {
          console.log("No swap needed")
        }
       
    })
  } catch (e) {
    console.log(e)
  }
}



//------------------------------------------------------USDCPrice ----------------------------------------------//



function USDCPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.USDCPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to USDC Price Initiated")
          time = setInterval(fetchUSDCPrice,50000)
      }    
    });
  })
}
timeIntervalUSDCPriceCallOracle = setInterval(USDCPrice,300000)



async function fetchUSDCPrice(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.USDC().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"].usd;
      var price = new ETHUSDTPriceInfo({ priceETHUSDT : y})
      const data = await price.save();         
      var v1 = await ETHUSDTPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceETHUSDT)/v1[1].priceETHUSDT*100.00;        
       console.log("Current  USDC Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
      
      } else if (variance === 0){
        console.log("No Perform Swap")
        
      } else {
        console.log("No swap needed")
      }
    })
  } catch (e) {
    console.log(e)
  }
}



//------------------------------------------------------ sBCH Price ----------------------------------------------//


function sBCHPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.sBCHPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to sBCH Price Initiated")
          time = setInterval(fetchsBCHPrice,50000)
      }    
    });
  })
}
timeIntervalsBCHPriceCallOracle = setInterval(sBCHPrice,400000)



async function fetchsBCHPrice(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.sBCH().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0x36a2422a863d5b950882190ff5433e513413343a"].usd;
      var price = new sBCHPriceInfo({ priceBCHUSD : y})
      const data = await price.save();         
      var v1 = await sBCHPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceBCHUSD)/v1[1].priceBCHUSD*100.00;        
       console.log("Current  sBCH Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
      
      } else if (variance === 0){
        console.log("No Perform Swap")
        
      } else {
        console.log("No swap needed")
      }
    })
  } catch (e) {
    console.log(e)
  }
}

//================================sXTZ =================================//



function sXTZPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.sXTZPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to sXTZ Price Initiated")
          time = setInterval(sXTZ,50000)
      }    
    });
  })
}
timeIntervalXTZPriceCallOracle = setInterval(sXTZPrice,500000)



async function sXTZ(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.sXTZ().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0xf45b14ddabf0f0e275e215b94dd24ae013a27f12"].usd;
      var price = new XTZUSDPriceInfo({ priceXTZUSD : y})
      const data = await price.save();         
      var v1 = await XTZUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceXTZUSD)/v1[1].priceXTZUSD*100.00;        
       console.log("Current  sXTZ Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
      
      } else if (variance === 0){
        if (variance < -3 || variance > 0.0000003) {
          console.log("Perform swap needed")
          child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
        
      } else {
        console.log("No swap needed")
      }
    }
  })
  } catch (e) {
    console.log(e)
  }
}

sXTZPrice()


//==============================================COMP Price =======================================//



function COMPPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.COMPPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to COMP Price Initiated")
          time = setInterval(COMP,50000)
      }    
    });
  })
}
timeIntervalCOMPPriceCallOracle = setInterval(COMPPrice,600000)



async function COMP(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.COMP().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0xc00e94cb662c3520282e6f5717214004a7f26888"].usd;
      var price = new COMPUSDPriceInfo({ priceCOMPUSD : y})
      const data = await price.save();         
      var v1 = await COMPUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceCOMPUSD)/v1[1].priceCOMPUSD*100.00;        
       console.log("Current  COMP  Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
        child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
              console.log(`exec error: ${error}`);
          }
      });
      
      } else if (variance === 0){
        console.log("No Perform Swap")
        child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
              console.log(`exec error: ${error}`);
          }
      });
        
      } else {
        console.log("No swap needed")
      }
    })
  } catch (e) {
    console.log(e)
  }
}

COMPPrice()

// ====================================== sLTC ================================================//



function sLTCPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.sLTCPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to sLTCPrice Initiated")
          time = setInterval(sLTC,50000)
      }    
    });
  })
}
timeIntervaSLTCPriceCallOracle = setInterval(sLTCPrice,700000)



async function sLTC(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.sLTC().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0xc14103c2141e842e228fbac594579e798616ce7a"].usd;
      var price = new LTCUSDTPriceInfo({ priceLTCUSDT : y})
      const data = await price.save();         
      var v1 = await LTCUSDTPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceLTCUSDT)/v1[1].priceLTCUSDT*100.00;        
       console.log("Current  sLTC  Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
      
      } else if (variance === 0){
        console.log("No Perform Swap")
        
      } else {
        console.log("No swap needed")
      }
    })
  } catch (e) {
    console.log(e)
  }
}


// =======================================aADA ============================================//


function sADAPrice(){ 
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.sADAPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        console.log(err)
      } else {
          console.log("Transaction Hash ===> ",hash)
          console.log("Call to sADAPrice Initiated")
          time = setInterval(sADA,50000)
      }    
    });
  })
}
timeIntervalsADAPriceCallOracle = setInterval(sADAPrice ,80000)



async function sADA(){
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.sADA().call().then(async result => { 
      var x = JSON.parse(result)  
      const y = x["0xe36e2d3c7c34281fa3bc737950a68571736880a1"].usd;
      var price = new ADAUSDPriceInfo({ priceADAUSD : y})
      const data = await price.save();         
      var v1 = await ADAUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })        

       var variance = (y - v1[1].priceADAUSD )/v1[1].priceADAUSD*100.00;        
       console.log("Current  sADA  Price ====>" ,y, " Variance ====>" ,variance)   

       if (variance < -3 || variance > 0.0000003) {
        console.log("Perform swap needed")
      
      } else if (variance === 0){
        console.log("No Perform Swap")
        child_process.exec('node ../swap-wth-1inch/swap/busdSwap.js', (error, stdout, stderr) => {
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
              console.log(`exec error: ${error}`);
          }
      });
        
      } else {
        console.log("No swap needed")
      }
    })
  } catch (e) {
    console.log(e)
  }
}

wBTCPrice()
TUSDPrice()
USDCPrice()
sBCHPrice()
sXTZPrice()
COMPPrice()
sLTCPrice()
sADAPrice()


module.exports = router;