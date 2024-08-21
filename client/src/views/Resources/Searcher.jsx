import SearchIcon from "@mui/icons-material/Search";

export default function Searcher({handleSearch}) {
    return (
        <form onSubmit={handleSearch}>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="¿Qué estas buscando?"
                        className="border border-Grey rounded-lg px-4 py-3 pl-11 w-[566px] h-[48px] bg-inputBg text-card placeholder:text-Grey outline-none focus:border-Purple hover:border-Purple"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
                </div>
                <button className="bg-Purple tracking-wide hover:bg-PurpleHover text-white font-extrabold px-4 py-3 rounded-lg h-[48px] ease-linear duration-200">
                    Buscar
                </button>
            </div>
        </form>
    )
}
