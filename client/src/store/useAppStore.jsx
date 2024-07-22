import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./LoginSlice";
import { createRegisterSlice } from "./RegisterSlice";
import { createClassSlice } from "./ClassSlice";

export const useAppStore = create()(devtools((...a) => ({
    ...createUserSlice(...a),
    ...createRegisterSlice(...a),
    ...createClassSlice(...a),
}))) 