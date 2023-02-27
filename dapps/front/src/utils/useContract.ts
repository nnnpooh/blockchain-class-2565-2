import { useEffect } from "react";
import Secret from "@src/abi/secret";
import { useWorkingStore } from "./working-store";
import { ethers } from "ethers";

export function useContract() {
  const [account, isEthereumAvailable, setSecret] = useWorkingStore((state) => [
    state.account,
    state.isEthereumAvailable,
    state.setSecret,
  ]);
  const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  useEffect(() => {
    if (!account || !isEthereumAvailable) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const secret = new ethers.Contract(CONTRACT_ADDRESS, Secret.abi, signer);
    console.log({ secret });
    if (secret) {
      secret
        .secret()
        .then((data: string) => {
          if (data && typeof data === "string") setSecret(data);
        })
        .catch((err: any) => console.log(err));
    }
  }, [account]);
}
