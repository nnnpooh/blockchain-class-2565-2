import { expect } from "chai";
import { ethers } from "hardhat";
const { BigNumber } = ethers;

describe("Set 5", function () {
  it("tests BigNumber", async function () {
    const big1 = BigNumber.from(100);
    const big2 = BigNumber.from(10);
    expect(big1).to.be.equal(100);
    expect(big1.add(big2)).to.be.equal(110);
    expect(big1.sub(big2)).to.be.equal(90);
    expect(big1.mul(big2)).to.be.equal(1000);
  });
});
