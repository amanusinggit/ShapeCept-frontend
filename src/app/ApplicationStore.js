import { create } from "zustand";

const useApplicationStore = create((set) => ({
  headerHeight: 0,
  updateHeaderHeight: (height) => set(() => ({ headerHeight: height })),
}));

export default useApplicationStore;
