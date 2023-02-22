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

  async function operatingFixture() {
    const { owner, lottery, p1, p2, p3, p4, p5 } = await loadFixture(
      deployFixture
    );
    const ms = [1, 0.5, 0.2, 0.3, 0.15];
    const ps = [p1, p2, p3, p4, p5];
    const sumMoney = ms.reduce((partialSum, a) => partialSum + a, 0);
    const totalMoney = ethers.utils.parseEther(sumMoney.toString());
    const getOptions = (value: number) => ({
      value: ethers.utils.parseEther(value.toString()),
    });

    for await (const i of [...Array(ms.length).keys()]) {
      await lottery.connect(ps[i]).enter(getOptions(ms[i]));
    }

    return { owner, lottery, p1, p2, p3, p4, p5, totalMoney };
  }

  describe("Initial deployment checks", function () {
    it("checks manager - lottery", async function () {
      const { owner, lottery } = await loadFixture(deployFixture);
      // const manager = await lottery.manager();
      // console.log(typeof manager);
      // console.log(manager);
      expect(await lottery.manager()).to.equal(owner.address);
    });

    it("checks that lottery starts with no player - lottery", async function () {
      const { lottery } = await loadFixture(deployFixture);
      expect(await lottery.getPlayers()).to.have.lengthOf(0);
    });

    it("checks empty array (overkill way) - lottery", async function () {
      const { lottery } = await loadFixture(deployFixture);

      // try {
      //   await lottery.players(0);
      // } catch (err) {
      //   throw new Error(JSON.stringify(err));
      // }

      await expect(lottery.players(0)).to.eventually.be.rejectedWith();
    });
  });

  describe("Operation", function () {
    it("checks one player enter - lottery", async function () {
      const { lottery, p1 } = await loadFixture(deployFixture);

      const options = { value: ethers.utils.parseEther("1.0") };
      await lottery.connect(p1).enter(options);

      expect(await lottery.players(0)).to.be.equal(p1.address);
      expect(await lottery.getPlayers()).to.have.lengthOf(1);
      expect(await ethers.provider.getBalance(lottery.address)).to.be.equal(
        ethers.utils.parseEther("1.0")
      );
    });

    it("checks minimum amount to enter - lottery", async function () {
      const { lottery, p1 } = await loadFixture(deployFixture);
      const options = { value: ethers.utils.parseEther("0.05") };
      await expect(lottery.connect(p1).enter(options)).to.be.revertedWith(
        "Please send at least 0.1 ETH."
      );
    });

    it("checks five players enter - lottery", async function () {
      const { lottery, p1, p2, p3, p4, p5 } = await loadFixture(deployFixture);
      const options = { value: ethers.utils.parseEther("1.0") };
      await lottery.connect(p1).enter(options);
      await lottery.connect(p2).enter(options);
      await lottery.connect(p3).enter(options);
      await lottery.connect(p4).enter(options);
      await lottery.connect(p5).enter(options);
      expect(await lottery.getPlayers()).to.have.lengthOf(5);
      expect(await ethers.provider.getBalance(lottery.address)).to.be.equal(
        ethers.utils.parseEther("5.0")
      );
    });
  });

  describe("Winning", function () {
    it("only allows owner to pick winner - lottery", async function () {
      const { owner, lottery, p1, p2, p3, p4, p5 } = await loadFixture(
        operatingFixture
      );

      await expect(lottery.connect(p2).pickWinner()).to.be.reverted;
      await expect(lottery.connect(owner).pickWinner()).to.not.be.reverted;
    });

    it("only allows picking winner when there is a player - lottery", async function () {
      const { owner, lottery, p1, p2, p3, p4, p5 } = await loadFixture(
        deployFixture
      );

      await expect(lottery.connect(owner).pickWinner()).to.be.reverted;
    });

    it("return the player the winning price - lottery", async function () {
      const { owner, lottery, p1, p2, p3, p4, p5, totalMoney } =
        await loadFixture(operatingFixture);

      const ps = [p1, p2, p3, p4, p5];
      const initBalances = [];
      for await (const p of ps) {
        const bal = await p.getBalance();
        initBalances.push(bal);
      }

      const initOwnerBalance = await owner.getBalance();
      const tx = await lottery.connect(owner).pickWinner();
      const receipt = await tx.wait();
      const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice);
      const ownerBalance = await owner.getBalance();

      let idx = 0;
      for await (const p of ps) {
        const bal = await ps[idx].getBalance();
        const initBal = initBalances[idx];

        // console.log({ initBal, bal, eq: bal.eq(initBal) });

        if (bal.gt(initBal)) {
          expect(bal).to.be.equal(initBal.add(totalMoney));
        } else {
          expect(bal).to.be.equal(initBal);
        }

        idx++;
      }

      expect(ownerBalance).to.be.equal(initOwnerBalance.sub(gas));
    });
  });
});
