const express = require('express');
var contract = require("@truffle/contract");
const router = new express.Router();
var CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var solc = require("solc");
const EthereumTx = require("ethereumjs-tx");
const Key = require('./config')
const simpleStorageInterface = require("../build/contracts/PriceTicker.json");


const XETHXXBTPriceInfo = require("../backend/model/price");
const ADAETHPriceInfo = require("../backend/model/price2");
const ETHUSDTPriceInfo = require("../backend/model/price3");
const BCHUSDPriceInfo = require("../backend/model/price4");
const XTZUSDPriceInfo = require("../backend/model/price5");
const COMPUSDPriceInfo = require("../backend/model/price6");
const LTCUSDTPriceInfo = require("../backend/model/price7");
const ADAUSDPriceInfo = require("../backend/model/price8");






var privateKey = new Buffer(Key.privateKey, 'hex')


var Web3 = require("web3");
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


  //------------------------------------------------------XETHXXBTPrice ----------------------------------------------//
  router.post("/XETHXXBTPrice", (req, res) => {
    web3.eth.defaultAccount = Key.fromAddress;
  
    web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
      var contractInstance = new web3.eth.Contract(
        Key.interface,
        Key.contractAddress
      );
      let encodedABI = contractInstance.methods.XETHXXBTPrice().encodeABI();
  
      let rawTx = {
        nonce: web3.utils.toHex(txCount),
        from: web3.eth.defaultAccount,
        to: Key.contractAddress,
        gasLimit: '0x3d0900',
        gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
        chainId: '0x04',
        data: encodedABI,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
      };
  
      var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
  
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
          res.status(500).json({ Body: err })
        } else {
          res.status(200).json({ Body: hash })
        }

       
      });
    })
  });

  router.get("/priceXETHXXBT", (req, res) => {
    web3.eth.defaultAccount = Key.fromAddress;
    var contractInstance = new web3.eth.Contract(
      Key.interface, Key.contractAddress, {
      from: web3.eth.defaultAccount,
      gasPrice: "0"
    }
    );
    try {
      contractInstance.methods.priceXETHXXBT().call().then(async result => { 
        var price = new priceXETHXXBTPriceInfo({ priceXETHXXBT : result})
        const data = await price.save();         
        var v1 = await priceXETHXXBTPriceInfo.find()
        .limit(2)
        .sort({ "_id": -1 })  
          

          const resultToInt = parseFloat(result);
          var variance = (resultToInt - v1[1].priceXETHXXBT)/v1[1].priceXETHXXBT*100.00;        
         res.status(200).json({ CurrentXETHXXBTPrice: resultToInt, Variance :variance  }) 
      })
    } catch (e) {
      res.status(500).json({ Body: e })
    }
  });
  

//------------------------------------------------------XETHXXBTPrice ----------------------------------------------//

router.post("/ADAETHPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.ADAETHPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceADAETH", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceADAETH().call().then(async result => { 
      // res.status(200).json({ Body : result})
      var price = new ADAETHPriceInfo({ priceADAETH : result})
      const data = await price.save();         
      var v1 = await ADAETHPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceADAETH)/v1[1].priceADAETH*100.00;        
       res.status(200).json({ CurrentADAETHPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});




router.post("/ETHUSDTPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.ETHUSDTPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceETHUSDT", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceETHUSDT().call().then(async result => { 
      var price = new ETHUSDTPriceInfo({ priceETHUSDT : result})
      const data = await price.save();         
      var v1 = await ETHUSDTPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceETHUSDT)/v1[1].priceETHUSDT*100.00;        
       res.status(200).json({ CurrentETHUSDTprice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});





router.post("/BCHUSDPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.BCHUSDPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceBCHUSD", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceBCHUSD().call().then(async result => { 
      var price = new BCHUSDPriceInfo({ priceXETHXXBT : result})
      const data = await price.save();         
      var v1 = await BCHUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceBCHUSD)/v1[1].priceBCHUSD*100.00;        
       res.status(200).json({ CurrentBCHUSDPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});






router.post("/XTZUSDPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.XTZUSDPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceXTZUSD", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceXTZUSD().call().then(async result => { 
      var price = new XTZUSDPriceInfo({ priceXTZUSD : result})
      const data = await price.save();         
      var v1 = await XTZUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceXTZUSD)/v1[1].priceXTZUSD*100.00;        
       res.status(200).json({ CurrentXTZUSDPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});





router.post("/COMPUSDPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.COMPUSDPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceCOMPUSD", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceCOMPUSD().call().then(async result => { 
      var price = new COMPUSDPriceInfo({ priceCOMPUSD : result})
      const data = await price.save();         
      var v1 = await COMPUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceCOMPUSD)/v1[1].priceCOMPUSD*100.00;        
       res.status(200).json({ CurrentCOMPUSDPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});




router.post("/LTCUSDTPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.LTCUSDTPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceLTCUSDT", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceLTCUSDT().call().then(async result => { 
      var price = new LTCUSDTPriceInfo({ priceLTCUSDT : result})
      const data = await price.save();         
      var v1 = await LTCUSDTPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceLTCUSDT)/v1[1].priceLTCUSDT*100.00;        
        res.status(200).json({ CurrentLTCUSDTPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});




router.post("/ADAUSDPrice", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;

  web3.eth.getTransactionCount(web3.eth.defaultAccount, (err, txCount) => {
    var contractInstance = new web3.eth.Contract(
      Key.interface,
      Key.contractAddress
    );
    let encodedABI = contractInstance.methods.ADAUSDPrice().encodeABI();

    let rawTx = {
      nonce: web3.utils.toHex(txCount),
      from: web3.eth.defaultAccount,
      to: Key.contractAddress,
      gasLimit: '0x3d0900',
      gasPrice: web3.utils.toHex(web3.utils.toWei('300', 'gwei')),
      chainId: '0x04',
      data: encodedABI,
      value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether'))
    };

    var tx = new EthereumTx(rawTx, { 'chain': 'rinkeby' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (err) {
        res.status(500).json({ Body: err })
      } else {
        res.status(200).json({ Body: hash })
      }

     
    });
  })
});

router.get("/priceADAUSD", (req, res) => {
  web3.eth.defaultAccount = Key.fromAddress;
  var contractInstance = new web3.eth.Contract(
    Key.interface, Key.contractAddress, {
    from: web3.eth.defaultAccount,
    gasPrice: "0"
  }
  );
  try {
    contractInstance.methods.priceADAUSD().call().then(async result => { 
      var price = new ADAUSDPriceInfo({ priceADAUSD : result})
      const data = await price.save();         
      var v1 = await ADAUSDPriceInfo.find()
      .limit(2)
      .sort({ "_id": -1 })  
        

        const resultToInt = parseFloat(result);
        var variance = (resultToInt - v1[1].priceADAUSD)/v1[1].priceADAUSD*100.00;        
       res.status(200).json({ CurrentADAUSDPrice: resultToInt, Variance :variance  }) 
    })
  } catch (e) {
    res.status(500).json({ Body: e })
  }
});


module.exports = router;