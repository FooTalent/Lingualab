import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./LoginSlice";
import { createRegisterSlice } from "./RegisterSlice";

export const useAppStore = create()(devtools((...a) => ({
    ...createUserSlice(...a),
    ...createRegisterSlice(...a),
}))) 