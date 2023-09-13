import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import fundoContato from "@/assets/svg/Rectangle269.svg";
import Skeleton from "react-loading-skeleton";
import imagemTelemarketing from "@/assets/img/image 34.png";
import iconeTelefone from "@/assets/img/image 37.png";
import iconeMapa from "@/assets/img/image 38.png";
import iconeRelogio from "@/assets/img/image 39.png";

export default function Contato() {

	const navigate = useNavigate()

	const [iFrameIsLoading, setIFrameIsLoading] = useState(true);
	const [imgIsLoading, setImgIsLoading] = useState(true);

	return (
		<>
			<Header />
			<div className="w-full h-full">
				<div className="flex flex-row justify-center items-end h-20 relative">
					<div className="absolute left-0 ml-20">
					<span className="breadCrumbs">
						<span onClick={() => { navigate("/") }} className="breadcrumbAnterior cursor-pointer">Página Inicial </span>
						/<span className="breadcrumbAtual"> Prestadores</span>
					</span>
					</div>
					<div className="text-4xl font-semibold text-center">
						Contato
					</div>
				</div>
				<div className="relative flex justify-center items-center h-[600px]">
					<img src={fundoContato} className="absolute z-40 w-full overflow-y-hidden" alt="" />
					<div className="flex z-40 mt-[-50px] gap-40">
						<div className="w-[400px] h-[450px] shadow-2xl rounded-md">
							{iFrameIsLoading && <Skeleton width={"100%"} height={"100%"} />}
							<iframe title="formulario_contato" className="w-[100%] h-[100%] rounded-md"
								style={{ display: iFrameIsLoading ? "none" : "block" }}
								src="https://app.pipefy.com/public/form/fdmepBpW?embedded=true"
								onLoad={() => { setIFrameIsLoading(false) }}
							/>
						</div>
						<div className="flex flex-col w-[400px] h-[450px] shadow-2xl rounded-b-md">
							<div className="w-[100%]">
								{imgIsLoading && <Skeleton width={"100%"} height={"266.55px"} />}
								<img
									src={imagemTelemarketing}
									style={{ display: imgIsLoading ? "none" : "block" }}
									onLoad={() => { setImgIsLoading(false) }}
									className="rounded-t-md"
								/>
							</div>
							<ul className="bg-verde-escuro-1 h-[100%] rounded-b-md flex flex-col px-4">
								<li className="flex items-center py-4 gap-2">
									<img className="h-[20px]" src={iconeTelefone} />
									<span className="text-white">0800 773 3838</span>
								</li>
								<li className="flex items-center py-4 gap-2">
									<img className="h-[20px]" src={iconeMapa} />
									<span className="text-white">Rua Haddock Lobo, 595 São Paulo - SP</span>
								</li>
								<li className="flex items-center py-4 gap-2">
									<img className="h-[20px]" src={iconeRelogio} />
									<span className="text-white">Segunda à sexta - 8h às 17h</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
