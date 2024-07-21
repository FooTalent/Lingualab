import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
    const { pathname } = useLocation()
    const navPages = [
        { text: "Aula Virtual", to: "/classroom" },
        { text: "Calendario", to: "/calendario" },
        { text: "Recursos", to: "/recursos" },
    ]

    return (
        <div>
            <ul className="flex items-center justify-center w-full h-[48px] gap-10">
                {navPages.map((item, text) => (
                    <li key={text} className={`${pathname === item.to ? "text-Purple" : "text-black"} font-semibold`}>
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
