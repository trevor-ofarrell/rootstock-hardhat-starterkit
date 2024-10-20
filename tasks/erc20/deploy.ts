import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 Example:
 npx hardhat erc20-deploy \
 --name "My Token" \
 --symbol MTK \
 --initial-supply 1000000 \
 --network rskTestnet
 */
task("erc20-deploy", "Deploy MockERC20 Smart Contract")
  .addParam("name", "Token name")
  .addParam("symbol", "Token symbol")
  .addParam("initialSupply", "Initial token supply")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const mockERC20 = await MockERC20.deploy(
        hre.ethers.parseUnits(taskArgs.initialSupply, 18),
      taskArgs.name,
      taskArgs.symbol,
      deployer.address, // initialOwner
    );

    await mockERC20.waitForDeployment();

    console.log("MockERC20 deployed to:", await mockERC20.getAddress());
  });
