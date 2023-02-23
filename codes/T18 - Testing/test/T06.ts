import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployMySecret() {
  const [owner, other] = await ethers.getSigners();
  const MySecret = await ethers.getContractFactory("MySecret");
  const mySecret = await MySecret.connect(owner).deploy("Super Secret");
  return { owner, other, mySecret };
}

describe("Set 6", function () {
  it("checks gas", async function () {
    const { other, mySecret } = await loadFixture(deployMySecret);
    const balanceBefore = await other.getBalance();
    const tx = await mySecret.connect(other).changeSecret("Changed Secret");
    const receipt = await tx.wait();
    const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice);
    const balanceAfter = await other.getBalance();
    expect(balanceAfter).to.be.equal(balanceBefore.sub(gas));
  });
});
