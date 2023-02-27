import { create } from "zustand";

interface NetworkType {
  id: number | null;
  name: string | null;
}

interface WorkingStoreType {
  account: string;
  balance: string;
  network: NetworkType;
  chainId: string;
  isEthereumAvailable: boolean;
  secret: string;
  setAccount: (acc: string) => void;
  setBalance: (bal: string) => void;
  setNetwork: (net: NetworkType) => void;
  setChainId: (id: string) => void;
  setIsEthereumAvailable: (b: boolean) => void;
  setSecret: (msg: string) => void;
}

export const useWorkingStore = create<WorkingStoreType>((set) => ({
  account: "",
  balance: "",
  network: {
    id: null,
    name: null,
  },
  chainId: "",
  isEthereumAvailable: false,
  secret: "",
  setAccount: (acc) => set(() => ({ account: acc })),
  setBalance: (bal) => set(() => ({ balance: bal })),
  setNetwork: (net) => set(() => ({ network: net })),
  setChainId: (id) => set(() => ({ chainId: id })),
  setIsEthereumAvailable: (b) => set(() => ({ isEthereumAvailable: b })),
  setSecret: (msg) => set(() => ({ secret: msg })),
}));
