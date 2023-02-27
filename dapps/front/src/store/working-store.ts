import { create } from "zustand";

interface NetworkType {
  id: number | null;
  name: string | null;
}

interface WorkingStoreType {
  account: string;
  balance: string;
  network: NetworkType;
  setAccount: (acc: string) => void;
  setBalance: (bal: string) => void;
  setNetwork: (net: NetworkType) => void;
}

export const useWorkingStore = create<WorkingStoreType>((set) => ({
  account: "",
  balance: "",
  network: {
    id: null,
    name: null,
  },
  setAccount: (acc) => set((state) => ({ account: acc })),
  setBalance: (bal) => set((state) => ({ balance: bal })),
  setNetwork: (net) => set((state) => ({ network: net })),
}));
