import { useEffect } from "react";
import { SecretContract, contractAddress } from "@src/abi/secret";
import { useMetaMaskStore, useWorkingStore } from "@src/utils/stores";
import { ethers } from "ethers";

export function useContract() {
  const [account, isEthereumAvailable, provider] = useMetaMaskStore((state) => [
    state.account,
    state.isEthereumAvailable,
    state.provider,
  ]);
  const [setSecret] = useWorkingStore((state) => [state.setSecret]);

  function getContract() {
    if (!isEthereumAvailable || !provider) return null;
    const signer = provider.getSigner();
    const secret = new ethers.Contract(
      contractAddress,
      SecretContract.abi,
      signer
    );
    return secret;
  }

  function fetchSecret() {
    const secret = getContract();
    if (secret) {
      secret
        .secret()
        .then((data: string) => {
          if (data && typeof data === "string") setSecret(data);
        })
        .catch((err: any) => console.log(err));
    }
  }

  useEffect(() => {
    if (!account || !isEthereumAvailable) return;
    fetchSecret();
  }, [account]);

  async function writeSecret(_secret: string) {
    const secret = getContract();
    if (!secret) return null;
    const tx = await secret.changeSecret(_secret);
    await tx.wait();
    fetchSecret();
  }

  return { writeSecret };
}
