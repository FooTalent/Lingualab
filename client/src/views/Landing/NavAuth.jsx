import { Link } from "react-router-dom"

const NavAuth = () => {

    return (
        <div className="flex gap-6 font-bold">
            <Link 
                to="/auth/login"
                className="text-white bg-transparent border border-white rounded-lg py-3 px-5 hover:bg-white hover:text-Purple duration-150">
                Iniciar Sesión
            </Link>
            <Link
                to="/auth/register" 
                className="bg-Yellow text-darkGray border border-Yellow rounded-lg py-3 px-6 hover:text-Yellow hover:bg-darkGray hover:border-darkGray duration-150">
                Registrarse
            </Link>
        </div>
    )
}

export default NavAuth