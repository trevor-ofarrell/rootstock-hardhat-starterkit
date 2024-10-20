import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace this with your actual deployed address

task("deploy-dao", "Deploy the SimpleDAO contract")
  .addParam("tokenAddress", "The address of the governance token")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const SimpleDAO = await hre.ethers.getContractFactory("SimpleDAO");
    const simpleDAO = await SimpleDAO.deploy(taskArgs.tokenAddress);
    await simpleDAO.waitForDeployment();
    console.log("SimpleDAO deployed to:", await simpleDAO.getAddress());
  });

task("create-proposal", "Create a new proposal")
  .addParam("description", "The description of the proposal")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const SimpleDAO = await hre.ethers.getContractAt("SimpleDAO", contractAddress);
    const tx = await SimpleDAO.createProposal(taskArgs.description);
    await tx.wait();
    console.log("Proposal created");
  });

task("vote", "Vote on a proposal")
  .addParam("proposalId", "The ID of the proposal")
  .addParam("support", "True to vote in favor, false to vote against")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const SimpleDAO = await hre.ethers.getContractAt("SimpleDAO", contractAddress);
    const tx = await SimpleDAO.vote(taskArgs.proposalId, taskArgs.support === 'true');
    await tx.wait();
    console.log("Vote cast");
  });

task("execute-proposal", "Execute a proposal")
  .addParam("proposalId", "The ID of the proposal to execute")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const SimpleDAO = await hre.ethers.getContractAt("SimpleDAO", contractAddress);
    const tx = await SimpleDAO.executeProposal(taskArgs.proposalId);
    await tx.wait();
    console.log("Proposal executed");
  });
