import LogoHeader from "../../components/LogoHeader";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { text: "Inicio", to: "/landing" },
    { text: "Historia", to: "/historia" },
    { text: "Conócenos", to: "/conocenos" },
    { text: "Iniciar Sesión", to: "/auth/login" },
    { text: "Registrarse", to: "/auth/register" },
  ];

  return (
    <div className="w-full">
      <div className="bg-Purple md:px-[115px] px-[20px] md:py-[63px] py-[24px] gap-[10px]">
        <div className="flex md:flex-row flex-col gap-10 md:gap-0 md:justify-between items-center">
          <LogoHeader className="w-[200px] h-[74px]" />
          <ul className="flex md:flex-row flex-col md:gap-6 gap-4 items-center list-none">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className={`${pathname === item.to
                  ? "text-Yellow font-semibold"
                  : "text-white font-semibold"
                  } text-[22px]`}
              >
                <Link to={item.to}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <div className="flex md:gap-6 gap-8">
            <a
              href="https://github.com/FooTalent/Lingualab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/ImagesFooter/githubF.svg"
                alt="GitHub"
                className="md:w-12 md:h-12 w-6 h-6"
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
                className="md:w-12 md:h-12 w-6 h-6"
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
                className="md:w-12 md:h-12 w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white text-center md:py-3 py-1 md:px-0 px-5">
        <p className="text-black font-normal md:text-lg text-[12px]">
          2024 &copy; - LinguaLab - Proyecto22 - Foo Talent Group - Todos los
          derechos reservados
        </p>
      </div>
    </div>
  );
};

export default Footer;
