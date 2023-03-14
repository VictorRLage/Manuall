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
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/rUrsArK.png"} nome={"Debora Flores"} cargo={"Scrum Master"} />
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/H3HYLwR.png"} nome={"Joaquim Pires"} cargo={"Desenvolvedor Backend"} />
                <CardPro tipo={"cardTime"} foto={"https://i.imgur.com/U6qg3tZ.png"} nome={"Júlia Araripe"} cargo={"Product Owner"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/JfjAkse.png"} nome={"Marco Campos"} cargo={"Analista de banco de dados"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/9PMZqlG.png"} nome={"Matheus Tonini"} cargo={"Desenvolvedor Frontend"} />
                <CardPro tipo={"cardTime2"} foto={"https://i.imgur.com/LC3i0Ow.png"} nome={"Victor Lage"} cargo={"Desenvolvedor Fullstack"} />
            </div>
        </body>
    );
}

export default Time;