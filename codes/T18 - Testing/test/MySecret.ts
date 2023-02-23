import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Lottery", function () {
  async function deployFixture() {
    const [owner, p1, p2, p3, p4, p5] = await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    // const lottery = await Lottery.deploy();
    const lottery = await Lottery.connect(owner).deploy();
    return { owner, lottery, p1, p2, p3, p4, p5 };
  }

  describe("Basic structure", function () {
    it("does something", async function () {});
    it("does another thing", async function () {
      expect(1).to.be.equal(1);
    });
    it("does extra thing", async function () {
      throw new Error("This is not right.");
    });
  });

  describe("Another scenario", function () {
    it("does this", async function () {});
    it("does another thing", async function () {});
  });
});
