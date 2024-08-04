import { useAppStore } from "../store/useAppStore"

const Home = () => {
    const { status, userDetail } = useAppStore()
    console.log(userDetail);

    if (status) return (
        <div>
            <h1>Home</h1>

        </div>
    )
}

export default Home
