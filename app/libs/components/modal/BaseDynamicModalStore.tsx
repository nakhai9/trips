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

  updateFormData: (formData: any) => void;

  onSubmit: ((formData: any) => void) | null;
};

export const useBaseDynamicModal = create<BaseDynamicModalState>((set) => ({
  isOpen: false,
  content: null,
  config: {},
  onSubmit: null,

  openBdm: (content, config = {}) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        content,
        config: {
          ...config,
        },
        onSubmit: resolve,
      });
    });
  },

  closeBdm: () =>
    set({
      isOpen: false,
    }),

  resetBdm: () => {
    set({ content: null, config: {}, onSubmit: null });
  },

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
