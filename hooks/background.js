import { create } from "zustand";

export const useStore = create((set) => ({
  location: null,
  backgroundStarted: null,
  setLocation: (newLocation) => set({ location: newLocation }),
  setBackground: (started) => set({ backgroundStarted: started }),
}));

export const useLocationStore = create((set) => ({
  loc: null,
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  setLocation: (loc) => set({ loc: loc }),
}));
