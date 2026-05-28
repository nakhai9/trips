import { ReactNode } from "react";
import { create } from "zustand";

export type BaseDynamicModalConfig = {
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  hideHeader?: boolean;
  actions?: any;
};

type BaseDynamicModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  config?: BaseDynamicModalConfig;

  //   functions
  openBdm: <T>(
    content: ReactNode,
    config?: BaseDynamicModalConfig,
  ) => Promise<T>;
  closeBdm: () => void;

  resolveFn: ((value: any) => void) | null;
};

export const useBaseDynamicModal = create<BaseDynamicModalState>((set) => ({
  isOpen: false,
  content: null,
  config: {},
  resolveFn: null,

  openBdm: (content, config = {}) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        content,
        config: {
          ...config,
        },
        resolveFn: resolve,
      });
    });
  },

  closeBdm: () =>
    set({
      isOpen: false,
    }),

  resetBdm: () => {
    set({ content: null, config: {}, resolveFn: null });
  },
}));
