import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWorkingStore } from "@src/store/working-store";
export function useAccount() {
  const [account, setAccount, setBalance, setNetwork] = useWorkingStore(
    (state) => [
      state.account,
      state.setAccount,
      state.setBalance,
      state.setNetwork,
    ]
  );

  useEffect(() => {
    async function getInfo() {
      if (!account || !ethers.utils.isAddress(account)) return;
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any //Look into this later
      );
      const balanceRaw = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balanceRaw));

      const nw = await provider.getNetwork();
      setNetwork({ id: nw.chainId, name: nw.name });
    }

    getInfo();
  }, [account]);

  useEffect(() => {
    if (!window.ethereum) {
      // Nothing to do here... no ethereum provider found
      return;
    }
    const accountWasChanged = (accounts: any) => {
      setAccount(accounts[0]);
      console.log("accountWasChanged");
    };
    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });
      // setaccount(changedAccounts[0]);
      console.log("getAndSetAccount");
    };
    const clearAccount = () => {
      // setaccount("0x0");
      console.log("clearAccount");
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", getAndSetAccount);
    window.ethereum.on("disconnect", clearAccount);
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {
        console.log("accounts", accounts);
        // No need to set account here, it will be set by the event listener
      },
      (error) => {
        // Handle any UI for errors here, e.g. network error, rejected request, etc.
        // Set state as needed
      }
    );
    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      window.ethereum?.removeListener("accountsChanged", accountWasChanged);
      window.ethereum?.removeListener("connect", getAndSetAccount);
      window.ethereum?.removeListener("disconnect", clearAccount);
    };
  }, []);
}
