import { expect } from "chai";
import { ethers } from "hardhat";

describe("Set 4", function () {
  it("checks initial message", async function () {
    const [owner] = await ethers.getSigners();
    const MySecret = await ethers.getContractFactory("MySecret");
    const mySecret = await MySecret.connect(owner).deploy("Super Secret");

    const message = await mySecret.secret();
    expect(message).to.be.equal("Super Secret");
  });
});
