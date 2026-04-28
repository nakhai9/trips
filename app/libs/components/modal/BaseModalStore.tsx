import { create } from "zustand";

export type BaseModalConfig = {
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  params?: unknown;
  actions?: React.ReactNode;
};

type BaseModalStore = {
  isOpen: boolean;
  component: React.ReactNode | null;
  config?: BaseModalConfig;

  params: unknown | null;

  open: (
    component: React.ReactNode,
    config?: BaseModalConfig,
    actions?: React.ReactNode,
  ) => void;
  close: () => void;
  set: <T>(params: T) => void;
};

export const useBaseModalStore = create<BaseModalStore>((set) => ({
  isOpen: false,
  component: null,
  config: undefined,
  actions: undefined,

  params: null,

  open: (component, config, actions) =>
    set({
      isOpen: true,
      component,
      config,
    }),

  close: () =>
    set({
      isOpen: false,
      component: null,
      config: undefined,
    }),

  set: (params) => set({ params }),
}));
