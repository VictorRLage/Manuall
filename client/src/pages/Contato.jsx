import Header from "../components/main/Header";
import fundoContato from "../assets/svg/Rectangle269.svg";


function Contato() {

  return (

    <>
      <Header />
      <div className="flex flex-row">
        <span className="ml-[190px] mt-[40px] space-x-1">
          <a href="./inicio" className="text-cinza mr-[2px]">
            Página Inicial
          </a>
          /
          <span className="font-extrabold text-verde-escuro-1">
            Contato
          </span>
        </span>
        <div id="titulo" className="pt-10 text-4xl ml-[250px] font-semibold text-center">Contato
        </div>
      </div>
      
      <div style={{ backgroundImage: `url(${fundoContato})` }} className=" h-[500px] bg-cover bg-center flex flex-row space-x-32 mt-[5px]" >
        {/* <svg className="absolute w-[100%] h-[100%]" viewBox="0 0 1920 797" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-186.819 19.5827C183.252 19.3957 1596.99 150.469 1942.37 18.5075C2287.75 -113.454 2288.44 525.925 1980.6 733.287C1672.75 940.649 124.127 391.442 -187.206 728.991C-498.538 1066.54 -556.889 19.7698 -186.819 19.5827Z" fill="#268054" />
        </svg> */}
        <div className="">
          <iframe title="formulario_contato" className=" w-[400px] h-[300px] ml-[200px] mt-[40px]"
            src='https://app.pipefy.com/public/form/fdmepBpW?embedded=true'
            frameborder='0'
          ></iframe>
        </div>

        <div className="mt-[25px]">
          <div className='contDados'>
            <div className='w-[350px] h-[235px]'>
              <img className="" src='https://i.imgur.com/a0UHTH3.png'></img>
            </div>
            <div className='bg-verde-escuro-1'>
              <ul className='navbarCont'>
                <li><img className='w-[20px] ml-[10px] mt-[3px] align-middle' src='https://i.imgur.com/WOyvxEK.png'></img>  <spam className="ml-[10px] text-white">11 92345-6978</spam></li>
                <li><img className='w-[20px] ml-[10px] mt-[3px] align-middle' src='https://i.imgur.com/iO24zKz.png'></img>  <spam className="ml-[10px] text-white">Rua Haddock Lobo, 595 São Paulo - SP</spam></li>
                <li><img className='w-[20px] ml-[10px] mt-[3px] align-middle' src='https://i.imgur.com/fFBzUVk.png'></img>  <spam className="ml-[10px] text-white">Segunda à sexta - 8h às 17h</spam></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


    </>
  )





}

export default Contato;
