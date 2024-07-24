import { getClasses, register } from "../services";

export const createClassSlice = (set) => ({
    classes: [],
    fetchClasses: async (idTeacher) => {
        const teacherClasses = await getClasses(idTeacher)
        if (!teacherClasses.isError) {
            set(() => ({
                classes: teacherClasses.data
            }))
        } else {
            Toast.fire({
                title: 'No ha sido posible obtener las clases',
                icon: 'error'
            })
        }
    }
})