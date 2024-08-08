import { Link } from "react-router-dom";

export default function LogoHeader() {
    return (
        <Link to={"/"}><img src="/LogoHeader.png" alt="Logotipo empresa" /></Link>
    )
}