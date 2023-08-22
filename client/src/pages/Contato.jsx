import Header from "../components/main/Header";


function Contato() {

  return (

    <>
      <Header></Header>
      <div id="titulo" className="pt-10 text-2xl font-semibold text-center">Contato</div>
      <span className="breadCrumbs">
        <a href="./inicio" className="breadcrumbAnterior">
          Página Inicial
        </a>
        /
        <span className="breadcrumbAtual">
          Contato
        </span>
      </span>
      <div className="bg-verde-escuro-1">
      <iframe title="formulario_contato" className=" w-[900px] h-[450px] ml-[200px] mt-[20px] "
        src='https://app.pipefy.com/public/form/fdmepBpW?embedded=true'
        frameborder='0'
      ></iframe>
      </div>
      
    </>
  )





}

export default Contato;
