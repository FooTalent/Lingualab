import { getClasses, register } from "../services";
import { Toast } from "../utils/toast";

export const createClassSlice = (set) => ({
    complete: false,
    classes: async (idTeacher) => {
        const teacherClasses = await getClasses(idTeacher)
        
    }
})