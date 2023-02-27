import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWorkingStore } from "./working-store";
export function useAccount() {
  const [
    account,
    setAccount,
    setBalance,
    setNetwork,
    isEthereumAvailable,
    setIsEthereumAvailable,
    chainId,
    setChainId,
  ] = useWorkingStore((state) => [
    state.account,
    state.setAccount,
    state.setBalance,
    state.setNetwork,
    state.isEthereumAvailable,
    state.setIsEthereumAvailable,
    state.chainId,
    state.setChainId,
  ]);

  useEffect(() => {
    async function getInfo() {
      if (!account || !ethers.utils.isAddress(account)) return;
      if (!isEthereumAvailable) return;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any //Look into this later
      );
      const balanceRaw = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balanceRaw));

      const nw = await provider.getNetwork();
      setNetwork({ id: nw.chainId, name: nw.name });
    }

    getInfo();
  }, [account, chainId]);

  useEffect(() => {
    if (!window.ethereum) {
      // Nothing to do here... no ethereum provider found
      return;
    }
    const accountWasChanged = (accounts: any) => {
      setAccount(accounts[0]);
      console.log("accountWasChanged");
    };
    const metaMaskConnect = async () => {
      console.log("metaMaskConnected");
    };

    const metaMaskChainChanged = (id: any) => {
      setChainId(id);
    };

    const clearAccount = () => {
      setAccount("");
      console.log("clearAccount");
    };

    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", metaMaskConnect);
    window.ethereum.on("chainChanged", metaMaskChainChanged);
    window.ethereum.on("disconnect", clearAccount);

    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {
        // When the browser is refreshed, you need to set the account from this action.
        console.log("accounts", accounts);
        if (accounts && Array.isArray(accounts)) setAccount(accounts[0] || "");
      },
      (error) => {}
    );

    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      window.ethereum?.removeListener("accountsChanged", accountWasChanged);
      window.ethereum?.removeListener("connect", metaMaskConnect);
      window.ethereum?.removeListener("disconnect", clearAccount);
    };
  }, []);

  // https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  useEffect(() => {
    if (typeof window !== "undefined" && "ethereum" in window) {
      setIsEthereumAvailable(true);
    }
  }, []);
}
