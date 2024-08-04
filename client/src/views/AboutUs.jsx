import { useAppStore } from "../store/useAppStore"

const AboutUs = () => {
    const { status } = useAppStore()
    if (status) return (
        <div>
            <h1>AboutUs</h1>

        </div>
    )
}

export default AboutUs
