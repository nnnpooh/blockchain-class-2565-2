import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Secret contract", function () {
  async function deploySecret() {
    const [owner, other] = await ethers.getSigners();

    const Secret = await ethers.getContractFactory("Secret");

    const message = "Test Message";
    const secret = await Secret.deploy(message);

    return { owner, other, secret, message };
  }

  it("checks owner", async function () {
    const { secret, owner } = await loadFixture(deploySecret);
    expect(await secret.owner()).to.equal(owner.address);
  });

  it("checks initial message", async function () {
    const { secret, message } = await loadFixture(deploySecret);
    expect(await secret.secret()).to.equal(message);
  });

  it("cannot change message by others", async function () {
    const { secret, other } = await loadFixture(deploySecret);
    await expect(
      secret.connect(other).changeSecret("Change")
    ).to.be.revertedWith("Only owner can change the message.");
  });

  it("lets owner change message", async function () {
    const { secret, owner } = await loadFixture(deploySecret);

    await secret.connect(owner).changeSecret("New Message");

    expect(await secret.secret()).to.equal("New Message");
  });
});
