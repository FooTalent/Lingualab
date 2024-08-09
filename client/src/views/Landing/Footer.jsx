import LogoHeader from "../../components/LogoHeader";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { text: "Inicio", to: "/landing" },
    { text: "Historia", to: "/historia" },
    { text: "Conócenos", to: "/conocenos" },
    { text: "Iniciar Sesión", to: "/login" },
    { text: "Registrarse", to: "/signup" },
  ];

  return (
    <div className="w-full">
      <div className="bg-Purple flex items-center justify-between max-w-[1210px] mx-auto h-[150px] py-[16px]">
        <LogoHeader className="w-[200px] h-[200px]" />
        <ul className="flex space-x-4 text-lg list-none">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className={`${
                pathname === item.to
                  ? "text-Yellow font-extrabold"
                  : "text-white font-normal"
              } text-[22px] px-2 gap-6`}
            >
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <a
            href="https://github.com/FooTalent/Lingualab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/ImagesFooter/githubF.svg"
              alt="GitHub"
              className="w-[40px] h-[40px]"
            />
          </a>
          <a
            href="https://www.figma.com/proto/6ExckQ1hkSbVy141KvKx6L/Foo-Talent-Group?page-id=1%3A3&node-id=848-1121&viewport=-19813%2C521%2C0.43&t=NNiOqA3W9NAZoW5B-1&scaling=contain&content-scaling=fixed&starting-point-node-id=848%3A1121"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/ImagesFooter/figmaF.svg"
              alt="Figma"
              className="w-[40px] h-[40px]"
            />
          </a>
          <a
            href="https://www.instagram.com/lingualab_idioma/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/ImagesFooter/InstagramF.svg"
              alt="Instagram"
              className="w-[40px] h-[40px]"
            />
          </a>
        </div>
      </div>
      <div className="bg-white text-center py-4">
        <p className="text-black text-lg">
          2024 &copy; - LinguaLab - Proyecto22 - Foo Talent Group - Todos los
          derechos reservados
        </p>
      </div>
    </div>
  );
};

export default Footer;
