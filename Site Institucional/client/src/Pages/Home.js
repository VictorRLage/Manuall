import React from 'react';
import Header from '../Components/Header';

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
                <div className='contFoto'>
                    <img src='https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                </div>
                <div className='contNossaHist'>
                    <div className='conteudoNossaHist'>
                        <h1>Nossa Historia</h1>
                        <p>Adipisicing deserunt non et cupidatat veniam dolor sint consequat dolore amet irure nostrud et. Quis dolor amet id veniam ipsum. Laborum minim aliquip quis ad tempor ullamco id ad proident cupidatat velit proident consequat.</p>
                        <p>Nostrud dolore enim sit excepteur consectetur cupidatat laborum qui ipsum qui incididunt tempor proident dolor. Mollit mollit dolor esse sit mollit minim cupidatat ullamco et fugiat id tempor nulla. Ullamco consectetur enim ut magna. Anim ea mollit ipsum magna commodo commodo et est est in do aliquip. Ad tempor incididunt labore laboris amet dolor culpa anim excepteur laboris tempor dolore labore.</p>
                    </div>
                </div>
            </div>
            <div className='blocos'>

            </div>
        </body>
    );
}

export default Home;
