import AboutComponent from "../../components/AboutComponent";

const AboutUs = () => {
  return (
    <div className="">
      <div className="hidden md:block relative p-0 m-0 w-full">
        <div className="relative">
          <img
            src="/ImagesAboutUs/bannerConocenos.png"
            alt="Banner Conocenos"
            className="w-screen h-auto object-cover"
          />
          <div className="absolute top-0 left-0 p-4">
            <h2 className="mt-20 ml-16 text-7xl font-bold text-[#444444]">
              ¡Hola!
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

      <div className="md:hidden flex flex-col p-5 gap-8 items-center bg-about">
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-semibold text-[32px] text-[#444444]">¡Hola!</h2>
          <p className="text-[20px] font-medium text-[#444444]">
            Somos un equipo interdisciplinario de Talento Junior que busca ganar
            experiencia y seguridad para dar nuestros primeros pasos como
            profesionales.
          </p>
        </div>
        <img
          src="/ImagesAboutUs/conocenosSup.png"
          alt="Banner Conocenos"
          className="w-[204px] h-[204px]"
        />
      </div>

      <div className="flex justify-center mt-16">
        <h3 className="md:text-3xl text-[20px] font-bold text-[#444444] mb-4 text-center">
          Como equipo trabajamos para ...
        </h3>
      </div>

      <div className="flex md:flex-row flex-col md:mt-16 md:mb-20">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="/ImagesAboutUs/pcAboutUs.png"
            alt="PC About Us"
            className="md:ml-0 ml-8 md:w-3/4 h-auto"
          />
        </div>

        <div className="md:w-1/2 flex flex-col max-w-[700px] md:text-[26px] md:leading-[30,47px] text-[16px] md:p-0 p-5 gap-6 md:gap-12">
          {[
            {
              title: "Objetivo:",
              text: "Crear un proyecto web que ayude al usuario a solucionar un problema con un producto útil y funcional.",
            },
            {
              title: "Desafío:",
              text: "Buscamos un cliente real que tuviese una necesidad.<br/>Pensamos una idea innovadora para convertirse en un producto útil.<br/>Validamos la idea. Nos aseguramos de que tuviera potencial y fuese exitosa.",
            },
            { title: "Duración:", text: "8 semanas, más de 200hs." },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 md:gap-12">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Icon"
                className="md:w-12 md:h-12 w-6 h-6"
              />
              <div>
                <div className="flex items-baseline">
                  <strong className="text-[#444444] mr-1">{item.title}</strong>
                  <p
                    className="text-[#444444]"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F0ECFF] py-8 mt-8 flex flex-col items-center text-center">
        <h3 className="text-3xl font-bold text-[#444444] mt-10 mb-16">
          Nuestros Roles
        </h3>
        <div className="flex flex-col items-center gap-12 max-w-[1210px]">
          <span className="bg-[#6945FF] w-[390px] text-white py-3 px-4 rounded-lg md:w-[573px] h-[48px] md:hidden flex items-center justify-start font-bold text-xl">
            Equipo Project Management
          </span>
          <div className="md:hidden flex flex-col gap-4 w-full">
            <div className="md:w-[573px] w-[390px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-start gap-6">
              <img
                src="/ImagesAboutUs/Mercedes.png"
                alt="María Mercedes Ramella"
                className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
              />
              <div className="text-[#444444] flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-left ">
                    María Mercedes Ramella
                  </h4>
                  <p className="text-xl mt-1 text-left ">PM - UX UI Designer</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/mercedes-ramella/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/LinkedIn.svg"
                      alt="LinkedIn"
                      className="md:w-10 w-6 md:h-10 h-6"
                    />
                  </a>
                  <a
                    href="https://www.behance.net/maramramella/moodboards"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Be.svg"
                      alt="Behance"
                      className="md:w-10 w-6 md:h-10 h-6"
                    />
                  </a>
                  <a
                    href="https://github.com/MechiRamella"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Github.svg"
                      alt="GitHub"
                      className="md:w-10 w-6 md:h-10 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <span className="bg-[#6945FF] w-full text-white py-3 px-4 rounded-lg md:w-[573px] h-[48px] md:hidden flex items-center justify-start font-bold text-xl">
              Equipo QA
          </span>
          <div className="md:w-[573px] w-[390px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md md:hidden flex items-start gap-6">
              <img
                src="/ImagesAboutUs/Clara.png"
                alt="Clara Carbonetti"
                className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
              />
              <div className="text-[#444444] flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-left ">
                    Clara Carbonetti
                  </h4>
                  <p className="text-xl mt-1 text-left ">Q&A Tester Manual</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/clara-carbonetti-76719a6/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/LinkedIn.svg"
                      alt="LinkedIn"
                      className="md:w-10 w-6 md:h-10 h-6"
                    />
                  </a>
                  <a
                    href="https://github.com/claruchis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Github.svg"
                      alt="GitHub"
                      className="md:w-10 w-6 md:h-10 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>

          <div className="hidden md:flex justify-between w-full">
            <span className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-[573px] h-[48px] flex items-center justify-start font-bold text-xl">
              Equipo Project Management
            </span>

            <span className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-[573px] h-[48px] flex items-center justify-start font-bold text-xl">
              Equipo QA
            </span>
          </div>

          <div className="hidden md:flex justify-between w-full">
            <div className="w-[573px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-start gap-6">
              <img
                src="/ImagesAboutUs/Mercedes.png"
                alt="María Mercedes Ramella"
                className="w-32 h-32 rounded-full"
              />
              <div className="text-[#444444] flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-left ">
                    María Mercedes Ramella
                  </h4>
                  <p className="text-xl mt-1 text-left ">PM - UX UI Designer</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/mercedes-ramella/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/LinkedIn.svg"
                      alt="LinkedIn"
                      className="w-8 h-8"
                    />
                  </a>
                  <a
                    href="https://www.behance.net/maramramella/moodboards"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Be.svg"
                      alt="Behance"
                      className="w-8 h-8"
                    />
                  </a>
                  <a
                    href="https://github.com/MechiRamella"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Github.svg"
                      alt="GitHub"
                      className="w-8 h-8"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-[573px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-start gap-6">
              <img
                src="/ImagesAboutUs/Clara.png"
                alt="Clara Carbonetti"
                className="w-32 h-32 rounded-full"
              />
              <div className="text-[#444444] flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-left ">
                    Clara Carbonetti
                  </h4>
                  <p className="text-xl mt-1 text-left ">Q&A Tester Manual</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://www.linkedin.com/in/clara-carbonetti-76719a6/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/LinkedIn.svg"
                      alt="LinkedIn"
                      className="w-8 h-8"
                    />
                  </a>
                  <a
                    href="https://github.com/claruchis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/ImagesAboutUs/Github.svg"
                      alt="GitHub"
                      className="w-8 h-8"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <span className="bg-[#6945FF] w-[390px] text-white py-3 px-4 rounded-lg md:w-full h-[48px] flex items-center justify-start font-bold text-xl mx-auto mt-6">
            Equipo UX UI Designer
          </span>

          <div className="text-left text-xl w-full">
            <div className="flex md:flex-row flex-col md:gap-16 gap-4 w-full">
              <div className="flex flex-col gap-4 items-center w-full">
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
                      {
                        src: "/ImagesAboutUs/Github.svg",
                        url: "https://github.com/Camila-Gon",
                      },
                    ],
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="md:w-[573px] w-[390px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
                  >
                    <img
                      src={card.imgSrc}
                      alt={card.name}
                      className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
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
                              className="md:w-10 w-6 md:h-10 h-6"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 items-center w-full">
                {[
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
                    className="md:w-[573px] w-[390px] h-[160px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
                  >
                    <img
                      src={card.imgSrc}
                      alt={card.name}
                      className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
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
                              className="md:w-10 w-6 md:h-10 h-6"
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

          <button className="bg-[#6945FF] text-white py-3 px-4 rounded-lg w-full h-[48px] flex items-center justify-start font-bold text-xl mx-auto mt-6">
            Equipo Devs
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12 text-left text-xl">
            <div className="flex md:flex-row flex-col md:gap-16 gap-4">
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
                    className="md:w-[573px] w-[390px] h-[150px] p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
                  >
                    <img
                      src={card.imgSrc}
                      alt={card.name}
                      className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
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
                              className="md:w-10 w-6 md:h-10 h-6"
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
                    className="md:w-[573px] w-[390px] h-[150px] mr-30 p-4 rounded-lg border border-[#444444] bg-white shadow-md flex items-center gap-4"
                  >
                    <img
                      src={card.imgSrc}
                      alt={card.name}
                      className="md:w-32 md:h-32 w-[75px] h-[75px] rounded-full"
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
                              className="md:w-10 w-6 md:h-10 h-6"
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
      </div>

      <AboutComponent />

      <div className="relative p-0 m-0 w-full">
        <div className="relative -mb-4">
          <img
            src="/ImagesAboutUs/graciasbanner.png"
            alt="Banner Conocenos"
            className="w-screen h-auto object-cover first-line:block"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
