import { useAppStore } from "../store/useAppStore"

const Home = () => {
    const { status, loguot } = useAppStore()

    if (status) return (
        <div>
            <h1>Home</h1>
            <button onClick={() => loguot()}>Cerrar</button>
        </div>
    )
}

export default Home
