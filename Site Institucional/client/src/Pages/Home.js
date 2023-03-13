import React from 'react';
import Header from '../Components/Header';
import Bloco from '../Components/Bloco';
import Footer from '../Components/Footer';

function Home() {
    return (
        <body>
            <header>
                <Header ativo={"Home"} />
            </header>
            <div className='contBanner'>
                <div className='bannerCardEsq'>
                    <div className='bola'></div>
                    <div className='cardBanner'>
                        <h1>Na <b>manuall</b> você pode encontrar um profissional para <b>resolver</b> qualquer <b>problema</b></h1>
                        <p>Contrate um profissional que vai te ensinar a resolver o problema.</p>
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
                        <p>Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco.</p>
                        <p>Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco.</p>
                        <p>Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco.</p>
                    </div>
                </div>

            </div>
            <div className='nsei'>
                <div className='blocos'>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/Kp72HOW.png"} titulo={"Missão"} texto={"Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco."}></Bloco>
                    </div>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/UpBLuKn.png"} titulo={"Visão"} texto={"Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco."}></Bloco>
                    </div>
                    <div>
                        <Bloco iconi={"https://i.imgur.com/byx0Unt.png"} titulo={"Valores"} texto={"Excepteur enim sint velit commodo incididunt ut duis dolore aliqua labore. Aliquip anim tempor ut non tempor aliquip irure ea magna Lorem sint occaecat tempor mollit. Sit occaecat ad in aliquip. Enim irure reprehenderit fugiat qui voluptate sunt ullamco."}></Bloco>
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
