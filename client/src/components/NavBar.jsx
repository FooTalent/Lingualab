import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const NavBar = () => {
    const { pathname } = useLocation()
    const { logout, status } = useAppStore()
    const [nav, setNav] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const handleClick = () => setNav(!nav);
    const normalizedPathname = pathname.replace("/workspace", "/aulavirtual");

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        setNav(false)
        document.body.style.overflow = "auto";

    }, [pathname, width])

    useEffect(() => {
        if (nav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [nav]);


    const navPages = [
        { text: "Inicio", to: "/" },
        { text: "Aula Virtual", to: "/aulavirtual" },
        { text: "Calendario", to: "/calendario" },
        { text: "Recursos", to: "/recursos" },
        { text: "Estudiantes", to: "/student" },
    ]

    const navHambur = [
        { text: "Perfil", to: "/profile" },
        { text: "Configuración", to: "/configuration" },
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

    ]

    const navLoginLanging = [
        { text: "Iniciar Sesión", to: "/auth/login" },
        { text: "Registrarse", to: "/auth/register" }
    ]

    return (
        <div>
            <ul className="hidden lg:flex justify-evenly lg:gap-4 2xl:gap-8">
                {status === true ?
                    navPages.map((item, text) => (
                        <li
                            key={text}
                            className="min-w-[133px] py-[10px] px-2 text-center"
                        >
                            <Link
                                to={item.to}
                                className={`hover:text-Yellow hover:font-semibold ease-out duration-300 text-[22px] leading-[25.78px]
                                    ${normalizedPathname === "/" && item.to === "/" ? "text-Yellow font-extrabold" :
                                        normalizedPathname.includes(item.to) && item.to !== "/" ? "text-Yellow font-extrabold" :
                                            "text-white font-normal"} 
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
                                    ${normalizedPathname === "/" && item.to === "/" ? "text-Yellow font-extrabold" :
                                        normalizedPathname.includes(item.to) && item.to !== "/" ? "text-Yellow font-extrabold" :
                                            "text-white font-normal"} 
                                `}

                            >
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div onClick={handleClick} className="lg:hidden z-10 text-white cursor-pointer">
                <FaBars fontSize={'large'} />
            </div>

            <div
                className={`fixed w-[215px] md:w-[330px] h-full bg-white flex flex-col lg:items-center gap-12 ease-linear duration-500 pt-2 px-5 pb-6
                    top-[49px] md:top-20 shadow-drawer
                    ${nav ? 'left-0 z-50' : '-left-full'} 
                    `}
            >
                <ul className={`flex flex-col lg:items-center gap-4 ease-linear duration-500`}>
                    <button onClick={nav ? handleClick : undefined} className="self-end text-Purple mt-1">
                        <FaTimes fontSize={'large'} />
                    </button>

                    {
                        status === true ?
                            navPages.map((item, text) => (
                                <li
                                    key={text}
                                    className="min-w-[133px] lg:py-[10px] lg:px-2 lg:text-center"
                                >
                                    <Link
                                        to={item.to}
                                        className={`lg:hover:text-Yellow lg:hover:font-semibold ease-out duration-300 lg:text-[22px] lg:leading-[25.78px]
                                    ${pathname === item.to ? "text-Yellow lg:font-extrabold" : "text-card lg:text-white font-normal"} 
                                `}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            )) :
                            navHamburLanding.map((item, text) => (
                                <li
                                    key={text}
                                >
                                    <Link
                                        to={item.to}
                                        className={`hover:font-semibold ease-out duration-300 text-sm leading-[25.78px]
                                    ${pathname === item.to ? "font-extrabold" : "text-black font-normal"} 
                                `}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))
                    }
                </ul>

                <hr className="lg:hidden bg-Purple border-0 border-b border-Purple" />

                <ul className={`lg:hidden flex flex-col lg:items-center gap-4 ease-linear duration-500`}>
                    {
                        status === true
                            ? navHambur.map((item, text) => (
                                <li
                                    key={text}
                                    className="min-w-[133px] lg:py-[10px] lg:px-2 lg:text-center"
                                >
                                    <Link
                                        to={item.to}
                                        className={`lg:hover:text-Yellow lg:hover:font-semibold ease-out duration-300
                                                ${pathname === item.to ? "text-Yellow lg:font-extrabold" : "text-card lg:text-white font-normal"} 
                                            `}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))
                            : navLoginLanging.map((item, text) => (
                                <li
                                    key={text}
                                >
                                    <Link
                                        to={item.to}
                                        className={`text-base font-extrabold tracking-wide ${item.text === 'Registrarse' ? 'text-Purple' : ''}`}
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))
                    }
                </ul>

                <hr className={`${status ? 'lg:hidden bg-Purple border-0 border-b border-Purple' : 'hidden'}`} />

                <button
                    onClick={() => logout()}
                    className={`${status ? 'inline' : 'hidden'} self-start font-extrabold tracking-wide text-Purple`}
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    )
}

export default NavBar;
