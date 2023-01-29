import { ethers } from "hardhat";

async function main() {
  const Secret = await ethers.getContractFactory("Secret");
  const secret = await Secret.deploy("Secret Message");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
