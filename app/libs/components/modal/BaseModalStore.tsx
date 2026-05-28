import { create } from "zustand";

export type BaseModalConfig<T = unknown> = {
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  params?: T;
  actions?: React.ReactNode;

  footer: React.ReactNode | null;

  onSubmit?: (formValue: T) => void | Promise<void>;
};

type BaseModalStore = {
  isOpen: boolean;
  content: React.ReactNode | null;

  config?: BaseModalConfig;

  open: (config?: BaseModalConfig) => void;

  close: () => void;
};

export const useBaseModal = create<BaseModalStore>((set) => ({
  isOpen: false,
  content: null,
  config: undefined,

  open: (config) =>
    set({
      isOpen: true,
      config,
    }),

  close: () =>
    set({
      isOpen: false,
      content: null,
      config: undefined,
    }),
}));
