import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner, other] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();
    const hardhatToken2 = await Token.connect(other).deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
