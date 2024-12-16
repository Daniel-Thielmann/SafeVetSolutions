export default function LearnMoreCards() {
    return (
        <div className="w-full max-w-6xl px-4 lg:w-full lg:max-w-none">
            <div className="flex flex-col items-center space-y-10 lg:space-y-0 lg:space-x-6 lg:flex-row lg:justify-center">
                <div className="relative bg-[#F2F7FB] p-6 rounded-lg border border-blue-900 flex flex-col items-center min-h-[250px] max-w-[250px]">
                    <img src="/assets/missao.png" alt="Missao" className="absolute top-0 right-0 mt-[-25px] mr-[-25px] w-15 h-15 rounded-full p-1" />
                    <h1 className="font-manilla-cellos text-[#1C275F] mb-2">Missao</h1>
                    <p className="text-center font-goldplay">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
                </div>
                <div className="relative bg-[#F2F7FB] p-6 rounded-lg border border-blue-900 flex flex-col items-center min-h-[250px] max-w-[250px]">
                    <img src="/assets/visao.png" alt="Visao" className="absolute top-0 right-0 mt-[-25px] mr-[-25px] w-15 h-15 rounded-full p-1" />
                    <h1 className="font-manilla-cellos text-[#1C275F] mb-2">Visao</h1>
                    <p className="text-center font-goldplay">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
                </div>
                <div className="relative bg-[#F2F7FB] p-6 rounded-lg border border-blue-900 flex flex-col items-center min-h-[250px] max-w-[250px]">
                    <img src="/assets/valores.png" alt="Valores" className="absolute top-0 right-0 mt-[-25px] mr-[-25px] w-15 h-15 rounded-full p-1" />
                    <h1 className="font-manilla-cellos text-[#1C275F] mb-2">Valores</h1>
                    <p className="text-center font-goldplay">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
                </div>
            </div>
        </div>
    );
}
