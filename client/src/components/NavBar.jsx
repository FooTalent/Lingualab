import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
    const { pathname } = useLocation()
    const { status } = useAppStore()
    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);
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

    const navHamburLanding = [
        { text: "Inicio", to: "/landing" },
        { text: "Historia", to: "/historia" },
        { text: "Conócenos", to: "/conocenos" },
        { text: "Iniciar Sesión", to: "/auth/login" },
        { text: "Registrarse", to: "/auth/register" }
    ]


    return (
        <div>
            <ul className="hidden md:flex xl:justify-evenly md:gap-1 lg:gap-4 2xl:gap-8">
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

            <div onClick={handleClick} className="md:hidden z-10">
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            <ul
                className={
                    !nav
                        ? "hidden"
                        : "absolute top-10 right-10 w-28 bg-white flex flex-col justify-center items-center"
                }
            >
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
                    navHamburLanding.map((item, text) => (
                        <li
                            key={text}
                            className="text-center"
                        >
                            <Link
                                to={item.to}
                                className={`hover:text-Yellow hover:font-semibold ease-out duration-300 text-sm leading-[25.78px]
                                    ${pathname === item.to ? "text-Yellow font-extrabold" : "text-black font-normal"} 
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
