import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUserSlice } from "./LoginSlice";
import { createRegisterSlice } from "./RegisterSlice";

export const useAppStore = create(devtools((set, get, api) => ({
    ...createUserSlice(set, get, api),
    ...createRegisterSlice(set, get, api),
})));