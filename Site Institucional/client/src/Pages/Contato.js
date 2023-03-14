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