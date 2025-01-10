const Migrations = artifacts.require("Migrations");
const TravCoinToken = artifacts.require("TravCoinToken");
const IPancakeRouter02 = artifacts.require("IPancakeRouter02");

const TestnetPancakeRouter = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
const MainnetPancakeRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E';

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Migrations);

  let TravCoinToken, currentTx;
  if(network == 'testnet'){
    TravCoinToken = await deployer.deploy(TravCoinToken, TestnetPancakeRouter);

    console.log("\n   Configuring 'TravCoinToken'");
    console.log("   ---------------------------");

    currentTx = await TravCoinToken.addManagementFeesReciever('0x1A1D9d3581e0aE2569349d3574327bfb77aC2B4B');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.addManagementFeesReciever('0x1A1D9d3581e0aE2569349d3574327bfb77aC2B4B');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setMinPendingFeesForAutoLiquify(BigInt(750000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setMinReserveETHForAutoBuyback(BigInt(1000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setMinReserveETHForAutoReinject(BigInt(110000000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    console.log("\n   Configuring 'PancakeRouter'");
    console.log("   ---------------------------");

    var pancakeRouter = await IPancakeRouter02.at(TestnetPancakeRouter);

    currentTx = await TravCoinToken.approve(pancakeRouter.address, BigInt(90000000000000));
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await pancakeRouter.addLiquidityETH(TravCoinToken.address, 90000000000000, 0, 0, TravCoinToken.address, Math.floor(Date.now() / 1000) + 300, {value: 1000000000000000000});
    console.log(`   > transaction hash: ${currentTx.tx}`);

    console.log("\n   Configuring 'TravCoinToken'");
    console.log("   ---------------------------");

    currentTx = await TravCoinToken.setLimitsEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setFeesEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setAutoFeeLiquifyEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setAutoBuybackEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.setAutoReinjectEnabled(true);
    console.log(`   > transaction hash: ${currentTx.tx}`);
  } else {
    TravCoinToken = await deployer.deploy(TravCoinToken, MainnetPancakeRouter);
    
    console.log("\n   Configuring 'TravCoinToken'");
    console.log("   ---------------------------");

    currentTx = await TravCoinToken.addManagementFeesReciever('0x1A1D9d3581e0aE2569349d3574327bfb77aC2B4B');
    console.log(`   > transaction hash: ${currentTx.tx}`);

    currentTx = await TravCoinToken.addManagementFeesReciever('0x1A1D9d3581e0aE2569349d3574327bfb77aC2B4B');
    console.log(`   > transaction hash: ${currentTx.tx}`);
  }
  currentTx = await TravCoinToken.sendTransaction({from: accounts[0], value: 100000000000000000});
  console.log(`   > transaction hash: ${currentTx.tx}`);

};
