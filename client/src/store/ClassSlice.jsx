import { getClasses, register } from "../services";

export const createClassSlice = (set) => ({
    complete: false,
    classes: async (idTeacher) => {
        const teacherClasses = await getClasses(idTeacher)
    }
})