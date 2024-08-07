import { useAppStore } from "../store/useAppStore";

const AboutUs = () => {
  const { status } = useAppStore();
  if (!status) return null;

  return (
    <div className="p-6">
      <div className="relative p-0 m-0 w-full">
        <div className="relative">
          <img
            src="/ImagesAboutUs/bannerConocenos.png"
            alt="Banner Conocenos"
            className="w-screen h-auto object-cover"
          />
          <div className="absolute top-0 left-0 p-4">
            <h2 className="mt-20 ml-16 text-7xl font-bold text-[#444444]">
              Hola!
            </h2>
            <p className="mt-2 ml-16 text-3xl text-[#444444]">
              <br />
              Somos un equipo interdisciplinario de <br />
              Talento Junior que busca ganar <br />
              experiencia y seguridad para dar <br />
              nuestros primeros pasos como profesionales.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <h3 className="text-3xl font-bold text-[#444444] mb-4 text-center">
          Como equipo trabajamos para ...
        </h3>
      </div>

      <div className="flex mt-8">
        <div className="w-1/2 flex justify-center">
          <img
            src="/ImagesAboutUs/pcAboutUs.png"
            alt="PC About Us"
            className="w-3/4 h-auto"
          />
        </div>

        <div className="w-1/2 mt-12">
          <div className="space-y-4">
            {[
              {
                title: "Objetivo:",
                text: "Crear un proyecto web que ayude al usuario a solucionar un problema con un producto útil y funcional.",
              },
              {
                title: "Desafío:",
                text: "Buscamos un cliente real que tuviese una necesidad. Pensamos una idea innovadora para convertirse en un producto útil. Validamos de Idea. Nos aseguramos de que tuviera potencial y fuese exitosa.",
              },
              { title: "Duración:", text: "6 semanas, más de 150hs." },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Icon"
                  className="w-6 h-6"
                />
                <div>
                  <div className="flex items-baseline">
                    <strong className="text-[#444444] mr-1">
                      {item.title}
                    </strong>
                    <p className="text-[#444444]">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#F0ECFF] py-8 mt-8 text-center">
        <h3 className="text-2xl font-bold text-[#444444] mb-4">
          Nuestros Roles
        </h3>

        <button className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-[1100px] h-[57px] mx-auto mb-4 flex items-center justify-start font-bold">
          Equipo UX UI Designer
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12">
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                imgSrc: "/ImagesAboutUs/Mercedes.png",
                name: "María Mercedes Ramella",
                role: "UX UI Designer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/mercedes-ramella/",
                  }, // Enlace de ejemplo
                  {
                    src: "/ImagesAboutUs/Be.svg",
                    url: "https://www.behance.net/maramramella/moodboards",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/MechiRamella",
                  },
                ],
              },
              {
                imgSrc: "/ImagesAboutUs/Paula.png",
                name: "Paula Areal",
                role: "UX UI Designer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/arealpaula/",
                  },
                  {
                    src: "/ImagesAboutUs/Be.svg",
                    url: "https://www.behance.net/arealpaula/projects",
                  },
                  {
                    src: "/ImagesAboutUs/Mundo.svg",
                    url: "https://arealpaula.myportfolio.com/",
                  },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="w-[500px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
              >
                <img
                  src={card.imgSrc}
                  alt={card.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-[#444444]">
                  <h4 className="text-lg font-bold">{card.name}</h4>
                  <p className="text-md">{card.role}</p>
                  <div className="flex space-x-4 mt-2">
                    {card.links.map((link, i) => (
                      <a
                        href={link.url}
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.src}
                          alt={`Icon ${i}`}
                          className="w-10 h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                imgSrc: "/ImagesAboutUs/Aylen.png",
                name: "Aylén Sol Martel",
                role: "UX UI Designer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/aylen-sol-martel/",
                  },
                  {
                    src: "/ImagesAboutUs/Be.svg",
                    url: "https://www.behance.net/aylen-sol-martel",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/MAAY7001",
                  },
                ],
              },
              {
                imgSrc: "/ImagesAboutUs/Camila.png",
                name: "Laura Camila Gonzalez",
                role: "UX UI Designer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/laura-c-gonzalez/",
                  },
                  {
                    src: "/ImagesAboutUs/Be.svg",
                    url: "https://www.behance.net/lauracgonzale5",
                  },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="w-[500px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
              >
                <img
                  src={card.imgSrc}
                  alt={card.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-[#444444]">
                  <h4 className="text-lg font-bold">{card.name}</h4>
                  <p className="text-md">{card.role}</p>
                  <div className="flex space-x-4 mt-2">
                    {card.links.map((link, i) => (
                      <a
                        href={link.url}
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.src}
                          alt={`Icon ${i}`}
                          className="w-10 h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-[1100px] h-[57px] mx-auto mb-4 flex items-center justify-start font-bold">
          Equipo Devs
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12">
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                imgSrc: "/ImagesAboutUs/Pedro.png",
                name: "Pedro Gonzalez",
                role: "Front Developer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/pedro-gonzalez-268321279/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/Simply92",
                  },
                ],
              },
              {
                imgSrc: "/ImagesAboutUs/Mariano.png",
                name: "Mariano Torres Distefano",
                role: "Front Developer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/mariano-torres-distefano/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/Marianotd",
                  },
                ],
              },

              {
                imgSrc: "/ImagesAboutUs/Vanessa.png",
                name: "Vanessa Sánchez Pulido",
                role: "Front Developer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/dev-vanessan/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/vanessann-dev",
                  },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="w-[500px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
              >
                <img
                  src={card.imgSrc}
                  alt={card.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-[#444444]">
                  <h4 className="text-lg font-bold">{card.name}</h4>
                  <p className="text-md">{card.role}</p>
                  <div className="flex space-x-4 mt-2">
                    {card.links.map((link, i) => (
                      <a
                        href={link.url}
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.src}
                          alt={`Icon ${i}`}
                          className="w-10 h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                imgSrc: "/ImagesAboutUs/Gustavo.png",
                name: "Gustavo Sírtori",
                role: "Back Developer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/gustavoandressirtori/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/gustsirt",
                  },
                  {
                    src: "/ImagesAboutUs/Mundo.svg",
                    url: "https://gustsirt.github.io/pagina-resumen/",
                  },
                ],
              },
              {
                imgSrc: "/ImagesAboutUs/Henryck.png",
                name: "Henryck Guaramato",
                role: "Back Developer",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/henryckg/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/henryckg",
                  },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="w-[500px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
              >
                <img
                  src={card.imgSrc}
                  alt={card.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-[#444444]">
                  <h4 className="text-lg font-bold">{card.name}</h4>
                  <p className="text-md">{card.role}</p>
                  <div className="flex space-x-4 mt-2">
                    {card.links.map((link, i) => (
                      <a
                        href={link.url}
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.src}
                          alt={`Icon ${i}`}
                          className="w-10 h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-[1100px] h-[57px] mx-auto mb-4 flex items-center justify-start font-bold">
          Equipo QA
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                imgSrc: "/ImagesAboutUs/Clara.png",
                name: "Clara Carbonetti",
                role: "Q&A Tester Manual",
                links: [
                  {
                    src: "/ImagesAboutUs/LinkedIn.svg",
                    url: "https://www.linkedin.com/in/clara-carbonetti-76719a6/",
                  },
                  {
                    src: "/ImagesAboutUs/Github.svg",
                    url: "https://github.com/claruchis",
                  },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="w-[500px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
              >
                <img
                  src={card.imgSrc}
                  alt={card.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="text-[#444444]">
                  <h4 className="text-lg font-bold">{card.name}</h4>
                  <p className="text-md">{card.role}</p>
                  <div className="flex space-x-4 mt-2">
                    {card.links.map((link, i) => (
                      <a
                        href={link.url}
                        key={i}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={link.src}
                          alt={`Icon ${i}`}
                          className="w-10 h-10"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
