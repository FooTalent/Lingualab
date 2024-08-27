import { Link } from "react-router-dom"

const NavAuth = () => {

    return (
        <div className="hidden lg:flex items-center lg:gap-6 md:gap-2 font-bold">
            <Link
                to="/auth/login"
                className="text-white bg-transparent border text-center border-white rounded-lg md:py-3 lg:px-5 md:px-2 hover:bg-white hover:text-Purple duration-150">
                Iniciar Sesión
            </Link>
            <Link
                to="/auth/register"
                className="bg-Yellow text-darkGray border border-Yellow rounded-lg lg:py-3 py-3 lg:px-6 md:px-2 hover:text-Yellow hover:bg-darkGray hover:border-darkGray duration-150">
                Registrarse
            </Link>
        </div>
    )
}

export default NavAuth