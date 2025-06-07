import {create} from "zustand";
import {authSlice} from "./authSlice/authSlice";
import {chatSlice} from "./chatSlice/chatSlice";

export const useAppStore = create((...a) => ({
  ...authSlice(...a),
  ...chatSlice(...a),
}));
