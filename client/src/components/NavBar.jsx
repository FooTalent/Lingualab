import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

const NavBar = () => {
    const { pathname } = useLocation()
    const { status } = useAppStore()
    const navPages = [
        { text: "Inicio", to: "/" },
        { text: "Aula Virtual", to: "/aulavirtual" },
        { text: "Calendario", to: "/calendario" },
        { text: "Recursos", to: "/recursos" },
        { text: "Estudiantes", to: "/student" },
    ]

    const navLanding = [
        { text: "Inicio", to: "/landing" },
        { text: "Historia", to: "/historia" },
        { text: "Conócenos", to: "/conocenos" }
    ]

    return (
        <div>
            <ul className="flex justify-evenly gap-8">
                {status === true ?
                    navPages.map((item, text) => (
                        <li
                            key={text}
                            className="min-w-[133px] py-[10px] px-2 text-center"
                        >
                            <Link
                                to={item.to}
                                className={`hover:text-Yellow hover:font-semibold ease-out duration-300 text-[22px] leading-[25.78px]
                                    ${pathname === item.to ? "text-Yellow font-extrabold" : "text-white font-normal"} 
                                `}
                            >
                                {item.text}
                            </Link>
                        </li>
                    )) :
                    navLanding.map((item, text) => (
                        <li
                            key={text}
                            className="min-w-[133px] py-[10px] px-2 text-center"
                        >
                            <Link
                                to={item.to}
                                className={`hover:text-Yellow hover:font-semibold ease-out duration-300 text-[22px] leading-[25.78px]
                                    ${pathname === item.to ? "text-Yellow font-extrabold" : "text-white font-normal"} 
                                `}
                            >
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavBar;
