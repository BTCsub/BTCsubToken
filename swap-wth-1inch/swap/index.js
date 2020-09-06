var Web3 = require('web3');
const BigNumber = require('bignumber.js');

const oneSplitABI = require('./abis/onesplit.json');
const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net


//const erc20ABI = require('./abis/wbtc.json');
const busdABI = require('./abis/busd.json');
const compABI = require('./abis/comp.json');
const tusdABI = require('./abis/tusd.json');
const wbtcABI = require('./abis/wbtc.json');

const details = require('./tokenDetails')


const daiAddress = details.dai_token_address;
const fromAddress = details.dai_token_holder_address;


const tusd_tokenAddress = details.tusd_token_address;
const tusd_holderAddress = details.tusd_holder_address;

const busd_tokenAddress = details.busd_token_address;
const busd_holderAddress = details.busd_token_address


const wbtc_tokenAddress = details.wbtc_token_address;
const wbtc_holderAddress = details.wbtc_holder_address;


const comp_tokenAddress = details.comp_token_address;
const compt_holderAddress = details.comp_holder_address;



const fromToken = daiAddress;
const fromTokenDecimals = 18;

const toToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH
const toTokenDecimals = 18;

const amountToExchange = new BigNumber(1);



switch (result ){
    case (result = swapDAI):
        return [approveToken(), getQuote()];
        break;
    case (result = swapTUSD):
        return [approveToken(), getQuote()];
        break;
    case (result = swapBUSD):
        return [approveToken(), getQuote()];
        break;
    case (result = swapWBTC):
        return [approveToken, getQuote()];
        break;
    default:
        console("nothing to do");
}

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545', { timeout: 20000000 }));

const onesplitContract = new web3.eth.Contract(oneSplitABI, onesplitAddress);
const daiToken = new web3.eth.Contract(erc20ABI, fromToken);

const oneSplitDexes = [
  "Uniswap",
  "Kyber",
  "Bancor",
  "Oasis",
  "Curve Compound",
  "Curve USDT",
  "Curve Y",
  "Curve Binance",
  "Curve Synthetix",
  "Uniswap Compound",
  "Uniswap CHAI",
  "Uniswap Aave",
  "Mooniswap",
  "Uniswap V2",
  "Uniswap V2 ETH",
  "Uniswap V2 DAI",
  "Uniswap V2 USDC",
  "Curve Pax",
  "Curve renBTC",
  "Curve tBTC",
  "Dforce XSwap",
  "Shell",
  "mStable mUSD"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitTransaction(txHash) {
    let tx = null;
    while (tx == null) {
        tx = await web3.eth.getTransactionReceipt(txHash);
        await sleep(2000);
    }
    console.log("Transaction " + txHash + " was mined.");
    return (tx.status);
}

function approveToken(tokenInstance, receiver, amount, callback) {
    tokenInstance.methods.approve(receiver, amount).send({ from: fromAddress }, async function(error, txHash) {
        if (error) {
            console.log("ERC20 could not be approved", error);
            return;
        }
        console.log("ERC20 token approved to " + receiver);
        const status = await waitTransaction(txHash);
        if (!status) {
            console.log("Approval transaction failed.");
            return;
        }
        callback();
    })
}

async function getQuote(fromToken, toToken, amount, callback) {
    let quote = null;
    try {
        quote = await onesplitContract.methods.getExpectedReturn(fromToken, toToken, amount, 100, 0).call();
        
    } catch (error) {
        console.log('Impossible to get the quote', error)
    }
    console.log("Trade From: " + fromToken)
    console.log("Trade To: " + toToken);
    console.log("Trade Amount: " + amountToExchange + " token to be traded");
    
    console.log("FOR   " + new BigNumber(quote.returnAmount).shiftedBy(-fromTokenDecimals).toString() + " ETH ");
    console.log("--------------RETURN QUOTE----------------",quote.returnAmount)
    console.log("Using Dexes:");
    for (let index = 0; index < quote.distribution.length; index++) {
        console.log(oneSplitDexes[index] + ": " + quote.distribution[index] + "%");
    }
    callback(quote);
}

let amountWithDecimals = new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toFixed()



getQuote(fromToken, toToken, amountWithDecimals, function(quote) {
    approveToken(daiToken, onesplitAddress, amountWithDecimals, async function() {
        // We get the balance before the swap just for logging purpose
        let ethBalanceBefore = await web3.eth.getBalance(fromAddress);
        let daiBalanceBefore = await daiToken.methods.balanceOf(fromAddress).call();
        console.log("-----------ETH BALANCE BEFORE SWAP----------",ethBalanceBefore, "-----token BALANCE BEFORE SWAP--------------",daiBalanceBefore)

        let slippage = new BigNumber(5/100 *quote.returnAmount).toFixed();
        
        let y = quote.returnAmount
        let x = slippage;
       
        let amntAfterSlippage = new BigNumber(y-x).toFixed();

        console.log("-------slippage---------",amntAfterSlippage );
        onesplitContract.methods.swap(fromToken, toToken, amountWithDecimals, amntAfterSlippage , quote.distribution, 0).send({ from: fromAddress, gas: 8000000 }, async function(error, txHash) {
            if (error) {
                console.log("Could not complete the swap", error);
                return;
            }
            const status = await waitTransaction(txHash);
            // We check the final balances after the swap for logging purpose
            let ethBalanceAfter = await web3.eth.getBalance(fromAddress);
            let daiBalanceAfter = await daiToken.methods.balanceOf(fromAddress).call();
            console.log("Final balances:")
            console.log("Change in ETH balance", new BigNumber(ethBalanceAfter).minus(ethBalanceBefore).shiftedBy(-fromTokenDecimals).toFixed(2));
            console.log("Change in BUSD balance", new BigNumber(daiBalanceAfter).minus(daiBalanceBefore).shiftedBy(-fromTokenDecimals).toFixed(2));
        });
    });
});

module.exports = {getQuote, waitTransaction, approveToken }