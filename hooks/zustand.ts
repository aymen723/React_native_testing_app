import { create } from "zustand";

type net = {
  netStatus: string | null;
  netType: string | null;
  setNet: (state: any) => any;
  setType: (state: any) => any;
};

export const useStore = create<net>((set) => ({
  netStatus: null,
  netType: null,
  setNet: () => set((state: any) => ({ netStatus: state })),
  setType: () => set((state: any) => ({ netType: state })),
}));
