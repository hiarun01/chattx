import {create} from "zustand";
import {authSlice} from "./authSlice/authSlice";

export const useAppStore = create((...a) => ({
  ...authSlice(...a),
}));
