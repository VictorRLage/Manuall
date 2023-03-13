import React from 'react';
import Header from '../Components/Header';
import CardPro from '../Components/CardPro';


function Time() {
    return (
        <body>
            <header>
                <Header ativo={"Time"} />
            </header>
            <div className='contTime'>
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/GyICueG.png"} nome={"Debora Flores"} cargo={"Scrum Master"} />
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/f3rMSUY.png"} nome={"Joaquim Pires"} cargo={"Desenvolvedor Backend"} />
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/mcs2LSO.png"} nome={"Júlia Araripe"} cargo={"Product Owner"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/ZyQJBw6.png"} nome={"Marco Campos"} cargo={"Analista de banco de dados"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/NPyJQM8.png"} nome={"Matheus Tonini"} cargo={"Desenvolvedor Frontend"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/26HKh8M.png"} nome={"Victor Lage"} cargo={"Desenvolvedor Fullstack"} />
            </div>
        </body>
    );
}

export default Time;