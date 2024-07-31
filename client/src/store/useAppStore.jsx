import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./LoginSlice";
import { createRegisterSlice } from "./RegisterSlice";
import { createProgramSlice } from "./ProgramSlice";

export const useAppStore = create()(devtools((...a) => ({
    ...createUserSlice(...a),
    ...createRegisterSlice(...a),
    ...createProgramSlice(...a),
}))) 