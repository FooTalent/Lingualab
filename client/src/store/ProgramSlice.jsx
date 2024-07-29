import { fetchClassRoomById } from "../services/programs.services";

export const createProgramSlice = (set) => ({
    classes: [],
    fetchClasses: async (token, classroomId) => {
        const teacherClasses = await fetchClassRoomById(token, classroomId)
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