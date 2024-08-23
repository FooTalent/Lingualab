
const AboutComponent = () => {
    return (
        <div className="flex flex-col items-center mx-auto max-w-[1200px] my-16 gap-20">
            <h2 className="text-3xl font-bold text-[#444444] md:mb-8">
                Tecnologías Utilizadas
            </h2>
            <div className="flex md:flex-row flex-col md:gap-0 gap-9 justify-between items-center w-full mx-auto">
                <div className="flex flex-col border h-full border-Grey p-5 rounded-[20px] gap-6">
                    <h2 className="text-3xl font-medium text-center">Diseño</h2>
                    <div className="flex gap-4">
                        <div className="flex gap-6 flex-col">
                            <img className="imgLogoTech" src="/ImagesAboutUs/figma.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/ilustrator.svg" alt="" />
                        </div>
                        <div className="flex justify-center items-center">
                            <img className="imgLogoTech" src="/ImagesAboutUs/ow.svg" alt="" />
                        </div>
                        <div className="flex gap-6 flex-col">
                            <img className="imgLogoTech" src="/ImagesAboutUs/miro.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/mora.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border h-full border-Grey p-5 rounded-[20px] gap-6">
                    <h2 className="text-3xl font-medium text-center">Desarrollo</h2>
                    <div className="flex gap-12">
                        <div className="flex flex-col items-center gap-8">
                            <h2 className="text-[28px] font-normal">Back</h2>
                            <div className="flex gap-6">
                                <div className="flex gap-6 flex-col">
                                    <img className="imgLogoTech" src="/ImagesAboutUs/mongo.svg" alt="" />
                                    <img className="imgLogoTech" src="/ImagesAboutUs/express.svg" alt="" />
                                </div>
                                <div className="flex gap-6 flex-col">
                                    <img className="imgLogoTech" src="/ImagesAboutUs/postman.svg" alt="" />
                                    <img className="imgLogoTech" src="/ImagesAboutUs/jsb.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-12">
                            <div className="flex flex-col items-center gap-8">
                                <h2 className="text-[28px] font-normal">Front</h2>
                                <div className="flex gap-6">
                                    <div className="flex gap-6 flex-col">
                                        <img className="imgLogoTech" src="/ImagesAboutUs/materialui.svg" alt="" />
                                        <img className="imgLogoTech" src="/ImagesAboutUs/vs.svg" alt="" />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img className="imgLogoTech" src="/ImagesAboutUs/react.svg" alt="" />
                                    </div>
                                    <div className="flex gap-6 flex-col">
                                        <img className="imgLogoTech" src="/ImagesAboutUs/jsf.svg" alt="" />
                                        <img className="imgLogoTech" src="/ImagesAboutUs/tailwind.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full border border-Grey p-5 rounded-[20px] gap-6">
                    <h2 className="text-[28px] font-normal">QA</h2>
                    <img src="/ImagesAboutUs/sql.svg" alt="" />
                </div>
                <div className="flex flex-col border h-full border-Grey p-5 rounded-[20px] gap-6">
                    <h2 className="text-3xl font-medium text-center">Comunicación</h2>
                    <div className="flex gap-4">
                        <div className="flex gap-6 flex-col">
                            <img className="imgLogoTech" src="/ImagesAboutUs/slack.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/meet.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/jira.svg" alt="" />
                        </div>
                        <div className="flex flex-col gap-6 justify-center items-center">
                            <img className="imgLogoTech" src="/ImagesAboutUs/excel.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/whatsapp.svg" alt="" />
                        </div>
                        <div className="flex gap-6 flex-col">
                            <img className="imgLogoTech" src="/ImagesAboutUs/githubi.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/notion.svg" alt="" />
                            <img className="imgLogoTech" src="/ImagesAboutUs/discord.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutComponent
