import { Link } from "react-router-dom";

export default function LogoHeader() {
    return (
        <Link to={"/"}><img src="/LogoHeader.png" alt="Logotipo empresa" className="w-[65px] h-6 md:w-[128px] md:h-12" /></Link>
    )
}