import { useAppStore } from "../store/useAppStore"

const Landing = () => {
    const { status } = useAppStore()
    if (status) return (
        <div>
            <h1>Landing</h1>

        </div>
    )
}

export default Landing
