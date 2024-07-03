import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./LoginSlice";

export const useAppStore = create()(devtools((...a) => ({
    ...createUserSlice(...a),
}))) 