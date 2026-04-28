import { create } from "zustand";

type GlobalStore = {
  isLoading: boolean;
  isShowToast: boolean;
  loadingMessage?: string;
  setIsLoading: (loading: boolean, message?: string) => void;
};
export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoading: false,
  isShowToast: false,
  loadingMessage: "",
  setIsLoading: (loading: boolean, message?: string) =>
    set({ isLoading: loading, loadingMessage: message }),
}));
