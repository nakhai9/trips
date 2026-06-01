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
};

export const useBaseDynamicModal = create<BaseDynamicModalState>((set) => ({
  isOpen: false,
  content: null,
  config: {},
  onSuccess: undefined,

  openBdm: (content, config = {}) => {
    return new Promise((resolve) => {
      set({
        isOpen: true,
        content,
        config: {
          ...config,
        },
      });
    });
  },

  closeBdm: () =>
    set({
      isOpen: false,
    }),

  resetBdm: () => {
    set({ content: null, config: {} });
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
