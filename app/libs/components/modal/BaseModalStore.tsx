import { create } from "zustand";

export type BaseModalConfig<T = unknown> = {
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  params?: T;
  actions?: React.ReactNode;
};

type BaseModalStore = {
  isOpen: boolean;
  component: React.ReactNode | null;
  config?: BaseModalConfig;

  open: (config?: BaseModalConfig) => void;

  close: () => void;

  updateParams: <T>(params: T) => void;
};

export const useBaseModal = create<BaseModalStore>((set) => ({
  isOpen: false,
  component: null,
  config: undefined,

  open: (config) =>
    set({
      isOpen: true,
      config,
    }),

  close: () =>
    set({
      isOpen: false,
      component: null,
      config: undefined,
    }),

  updateParams: (params) =>
    set((state) => ({
      config: {
        ...state.config,
        params,
      },
    })),
}));
