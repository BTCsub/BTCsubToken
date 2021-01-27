const PriceTicker = artifacts.require("./PriceTicker.sol");

module.exports = function(deployer) {
  deployer.deploy(PriceTicker);
};
