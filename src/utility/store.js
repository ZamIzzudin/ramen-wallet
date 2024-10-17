/** @format */

import { create } from "zustand";

const useStore = create((set) => ({
  details: {
    wallet: null,
    balance: 0,
    address: null,
  },
  network: [],
  is_saved: false,
  updateDetails: (state) =>
    set({
      details: { wallet: state.wallet, balance: 0, address: state.address },
    }),
  setSavedStatus: (state) => set({ is_saved: state }),
  setNetwork: (state) => set({ network: state }),
}));

export default useStore;
