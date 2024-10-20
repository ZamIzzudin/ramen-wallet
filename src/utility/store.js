/** @format */

import { create } from "zustand";

const useStore = create((set) => ({
  details: {
    wallet: null,
    address: null,
  },
  balance: 0,
  network: [],
  is_saved: false,
  transaction: null,
  updateDetails: (state) =>
    set({
      details: { wallet: state.wallet, address: state.address },
    }),
  updateBalance: (state) => set(() => ({ balance: state })),
  updateTransaction: (state) => set({ transaction: state }),
  setSavedStatus: (state) => set({ is_saved: state }),
  setNetwork: (state) => set({ network: state }),
}));

export default useStore;
