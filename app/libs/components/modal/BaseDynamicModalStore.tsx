import { ReactNode } from "react";
import { create } from "zustand";

export type BaseDynamicModalConfig = {
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  hideHeader?: boolean;
  actions?: any;

  formData?: {
    [key: string]: any;
  };

  onSuccess?: (success: boolean) => void;
};

type BaseDynamicModalEvent = {
  type: "resolve" | "close";
  name: string;
  payload?: any;
};

type BaseDynamicModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  config?: BaseDynamicModalConfig;
  modalEvent?: BaseDynamicModalEvent | null;
  resolveBdm?: (value: any) => void;

  //   functions
  openBdm: <T>(
    content: ReactNode,
    config?: BaseDynamicModalConfig,
  ) => Promise<T | null>;
  closeBdm: () => void;
  resetBdm: () => void;
  updateFormData: (formData: any) => void;
  setModalEvent: (event: BaseDynamicModalEvent | null) => void;
};

export const useBaseDynamicModal = create<BaseDynamicModalState>((set) => ({
  isOpen: false,
  content: null,
  config: {},
  modalEvent: null,
  resolveBdm: undefined,

  openBdm: (content, config = {}) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        content,
        config: {
          ...config,
        },
        resolveBdm: resolve,
      });
    });
  },

  closeBdm: () =>
    set((state) => {
      state.resolveBdm?.(null);
      return {
        isOpen: false,
        content: null,
        config: {},
        resolveBdm: undefined,
      };
    }),

  resetBdm: () => {
    set({ content: null, config: {}, modalEvent: null, resolveBdm: undefined });
  },

  setModalEvent: (event) => set({ modalEvent: event }),

  updateFormData: (formData: any) => {
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        formData,
      },
    }));
  },
}));
