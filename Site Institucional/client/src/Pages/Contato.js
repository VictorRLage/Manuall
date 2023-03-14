import React from 'react';
import Header from '../Components/Header';


function Contato() {
    return (
        <body>
            <header>
                <Header ativo={"Contato"}></Header>
            </header>
            <div className='contContato'>
                <div className='contMsgBox'>
                    <div className='tituloMsgBox'>
                        <h1>Contato</h1>
                    </div>
                    <div className='msgBox'>
                        <input placeholder='Nome Completo'></input>
                        <input placeholder='Endereço de e-mail'></input>
                        <textarea placeholder='Motivo do contato'></textarea >
                        <button>Enviar</button>

                    </div>
                </div>
                <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#008042" fill-opacity="1" d="M0,32L34.3,32C68.6,32,137,32,206,58.7C274.3,85,343,139,411,176C480,213,549,235,617,208C685.7,181,754,107,823,80C891.4,53,960,75,1029,106.7C1097.1,139,1166,181,1234,192C1302.9,203,1371,181,1406,170.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
                <div className='contDadosBox'>
                    <div className='contDados'>
                        <div className='contImgCont'>
                            <img src='https://i.imgur.com/a0UHTH3.png'></img>
                        </div>
                        <div className='boxDados'>
                            <ul className='navbarCont'>
                                <li><img className='iconiCont' src='https://i.imgur.com/WOyvxEK.png'></img>  <spam className="spam">11 92345-6978</spam></li>
                                <li><img className='iconiCont' src='https://i.imgur.com/iO24zKz.png'></img>  <spam className="spam">Rua Haddock Lobo, 595 São Paulo - SP</spam></li>
                                <li><img className='iconiCont' src='https://i.imgur.com/fFBzUVk.png'></img>  <spam className="spam">Segunda à sexta - 8h às 17h</spam></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Contato;