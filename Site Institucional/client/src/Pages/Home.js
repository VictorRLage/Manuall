import React from 'react';
import Header from '../Components/Header';
import Bloco from '../Components/Bloco';
import Footer from '../Components/Footer';

function Home() { 
    const EmptySpace = ({ spaceCount = 0 }) => {
        return (
          <>
            {Array.from({ length: spaceCount }, (item, index) => {
              return <br key={index} />;
            })}
          </>
        );
      };


    return (
        <body>
            <header>
                <Header ativo={"Home"} />
            </header>
            <div className='contBanner'>
                <div className='bannerCardEsq'>
                    <div className='bola'></div>
                    <div className='cardBanner'>
                        <h1>Na <b>manuall</b> você encontra serviço e ensino para <b>resolver</b> qualquer <b>problema</b></h1>
                        <p>Contrate um profissional, garanta seu aprendizado!</p>
                        <div><button>Encontrar</button><p className='p2'>Já tem uma conta? Fazer login</p></div>
                    </div>
                </div>
                <div className='bannerCardDir'>
                    <img src='https://i.imgur.com/2ePNYK0.png'></img>
                </div>
            </div>
            <div className='sobreNos'>

                <div className='contentSobreNos'>
                    <div className='sobreNosFoto'>
                        <img src='https://i.imgur.com/zTQzB2M.jpeg'></img>
                    </div>
                    <div className='sobreNosTexto'>
                        <h1>Como tudo começou?</h1>
                        <p> A Manuall surgiu de um projeto na faculdade SPTech (São Paulo Tech School), com o intuito de criar uma plataforma que una uma pessoa com uma necessidade à quem pode atendê-la.</p>
                        <p> Nosso olhar foi direcionado ao dia a dia das pessoas em suas casas, em momentos que são surpreendidas por necessidades de manutenção, desde uma troca de lâmpada, até pinturas e jardinagem.</p>
                        <p> Portanto, nosso objetivo é reunir prestadores de serviços gerais às pessoas que precisam desse auxílio. Porém, não só proporcionando um serviço impessoal, mas criando uma relação de propósito e aprendizado, através da possibilidade de ensino das atividades.</p>
                    </div>
                </div>

            </div>
            <div className='nsei'>
                <div className='blocos'>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/Kp72HOW.png"} titulo={"Missão"} texto={"A nossa misão é unir os prestadores de serviços gerais vocacionados as pessoas que necessitam de seus serviços dando a eles a oportunidade de passar seu conhecimento e deixar a sua marca no mundo."}></Bloco>
                    </div>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/UpBLuKn.png"} titulo={"Visão"} texto={"Ser a maior plataforma de prestadores de serviços gerais e ensino do Brasil transformando o mercado unindo o prestador de serviço e professor na mesma pessoa."}></Bloco>
                    </div>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/byx0Unt.png"} titulo={"Valores"} texto={"A Manual como valores visa ter propósito em tudo que faz, ter excelência, dar oportunidades as pessoas e ter transparência entre prestador e contratante"}></Bloco>
                    </div>
                </div>
                <div className='tecnologia'>
                    <h1>Tecnologias</h1>
                    <div className='linhas'>
                        <div className='tituloTec'>
                            <h2>Kotlin</h2>
                            <img className='foto' src='https://img.icons8.com/color/100/kotlin.png'></img>
                        </div>
                        <div className='linhaTec1'>
                            <progress className='linha' id="file" value="90" max="100"></progress>
                        </div>
                        <div className='tituloTec'>
                            <h2>JavaScript</h2>
                            <img className='foto' src='https://cdn.worldvectorlogo.com/logos/javascript-1.svg'></img>
                        </div>
                        <div className='linhaTec2'>
                            <progress className='linha' id="file" value="60" max="100"></progress>
                        </div>
                        <div className='span-secreto'></div>
                        <div className='tituloTec'>
                            <h2>Python</h2>
                            <img className='foto' src='https://cdn-icons-png.flaticon.com/512/5968/5968350.png'></img>
                        </div>
                        <div className='linhaTec3'>
                            <progress className='linha' id="file" value="30" max="100"></progress>
                        </div>

                    </div>
                </div>
                <div className='ttt'>
                </div>
            </div>


        </body>
    );
}

export default Home;
