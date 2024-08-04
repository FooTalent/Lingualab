import { useAppStore } from "../store/useAppStore"

const History = () => {
    const { status } = useAppStore()
    if (status) return (
        <div>
            <h1>History</h1>

        </div>
    )
}

export default History
