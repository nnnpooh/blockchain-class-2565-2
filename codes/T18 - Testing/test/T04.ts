import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployMySecret() {
  const [owner, other] = await ethers.getSigners();
  const MySecret = await ethers.getContractFactory("MySecret");
  const mySecret = await MySecret.connect(owner).deploy("Super Secret");
  return { owner, other, mySecret };
}

describe("Set 4-2", function () {
  it("checks initial message", async function () {
    const { mySecret } = await loadFixture(deployMySecret);
    const message = await mySecret.secret();
    expect(message).to.be.equal("Super Secret");
  });

  it("checks that message can be changed", async function () {
    const { other, mySecret } = await loadFixture(deployMySecret);
    await mySecret.connect(other).changeSecret("Changed Secret");
    expect(await mySecret.secret()).to.be.equal("Changed Secret");
  });
});
