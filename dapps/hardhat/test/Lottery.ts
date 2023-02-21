import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Lottery", function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    return { owner, lottery };
  }

  describe("State Variable Checks", function () {
    it("checks manager", async function () {
      const { owner, lottery } = await loadFixture(deployFixture);
      expect(await lottery.manager).to.equal(owner.address);
    });

    it("checks players array", async function () {
      const { owner, lottery } = await loadFixture(deployFixture);
      expect(await lottery.players(0)).to.equal("sdfsdf");
    });
  });
});
