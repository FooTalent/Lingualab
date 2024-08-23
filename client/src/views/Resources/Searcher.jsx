import SearchIcon from "@mui/icons-material/Search";

export default function Searcher({ handleSearch }) {
    return (
        <form onSubmit={handleSearch} className="order-1 w-full">
            <div className="flex items-center gap-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="¿Qué estas buscando?"
                        className="border border-Grey rounded-lg px-4 py-3 pl-11 h-[48px] bg-inputBg text-card placeholder:text-Grey outline-none focus:border-Purple hover:border-Purple truncate"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
                </div>
                <button className="bg-Purple tracking-wide hover:bg-PurpleHover text-white font-extrabold px-4 py-3 rounded-lg h-[48px] ease-out duration-600">
                    Buscar
                </button>
            </div>
        </form>
    )
}
