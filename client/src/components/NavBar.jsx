import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

const NavBar = () => {
    const { pathname } = useLocation()
    const {status} = useAppStore()
    const navPages = [
        { text: "Inicio", to: "/" },
        { text: "Aula Virtual", to: "/aulavirtual" },
        { text: "Calendario", to: "/calendario" },
        { text: "Recursos", to: "/recursos" },
        { text: "Alumnos", to: "/student" },
    ]

    const navLanding = [
        { text: "Landing", to: "/landing"},
        { text: "Historia", to: "/historia"},
        { text: "Conócenos", to: "/conocenos"}
    ]

    console.log(status)

    return (
        <div>
            <ul className="flex justify-center gap-[32px] w-[683px]">
                { status === true ? 
                navPages.map((item, text) => (
                    <li key={text} className={`${pathname === item.to ? "text-Yellow font-extrabold" : "text-white font-normal"} text-[22px] px-2 gap-6`}>
                        <Link to={item.to}>
                            {item.text}
                        </Link>
                    </li>
                )) : 
                    navLanding.map((item, text) => (
                        <li key={text} className={`${pathname === item.to ? "text-Yellow font-extrabold" : "text-white font-normal"} text-[22px] px-2 gap-6`}>
                            <Link to={item.to}>
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavBar
