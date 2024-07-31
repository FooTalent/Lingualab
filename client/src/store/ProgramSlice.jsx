import { getClassesByTeacherAndDate } from "../services/programs.services";

export const createProgramSlice = (set) => ({
    classes: [],
    fetchClasses: async (token, teacherId, date) => {
        try {
            const teacherClasses = await getClassesByTeacherAndDate(token, teacherId, date)
            if (!teacherClasses.isError) {
                set(() => ({
                    classes: teacherClasses.data
                }))
            }
        } catch (error) {
            Toast.fire({
                title: 'No ha sido posible obtener las clases',
                icon: 'error'
            })

        }
    }
})