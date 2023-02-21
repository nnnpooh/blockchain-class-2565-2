import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Lottery", function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    // const lottery = await Lottery.deploy();
    const lottery = await Lottery.connect(owner).deploy();
    return { owner, lottery, other };
  }

  describe("State Variable Checks", function () {
    it("checks manager - lottery", async function () {
      const { owner, lottery } = await loadFixture(deployFixture);
      // const a = await lottery.manager();
      // console.log(typeof a);
      // console.log(a);
      expect(await lottery.manager()).to.equal(owner.address);
    });

    it("checks enter - lottery", async function () {
      const { owner, lottery, other } = await loadFixture(deployFixture);
      await expect(lottery.connect(other).enter()).to.be.reverted;
    });

    it("checks data - lottery", async function () {
      const { owner, lottery, other } = await loadFixture(deployFixture);

      // try {
      //   await lottery.players(0);
      // } catch (err) {
      //   throw new Error(JSON.stringify(err));
      // }

      // await expect(lottery.players(0)).to.eventually.be.rejectedWith();

      const a = await lottery.getPlayers();
      console.log({ a });
      expect(a.length).to.equal(0);
    });
  });
});
