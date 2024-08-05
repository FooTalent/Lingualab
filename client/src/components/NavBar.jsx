import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
    const { pathname } = useLocation()
    const navPages = [
        { text: "Inicio", to: "/" },
        { text: "Aula Virtual", to: "/aulavirtual" },
        { text: "Calendario", to: "/calendario" },
        { text: "Recursos", to: "/recursos" },
        { text: "Alumnos", to: "/alumnos" },
    ]

    return (
        <div>
            <ul className="flex justify-center gap-[32px] w-[683px]">
                {navPages.map((item, text) => (
                    <li key={text} className={`${pathname === item.to ? "text-Yellow font-extrabold" : "text-white font-normal"} text-[22px] px-2 gap-6`}>
                        <Link to={item.to}>
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavBar
