import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom'


function Header({ ativo }) {



    return (
        <div className="header">
            <div className='contLogo'>
                <img className='logo-header' src='https://i.imgur.com/dqboyYc.jpeg' />
            </div>
            <div className='contNavbar'>
                <ul className="navbar">
                    <li className={ativo==="Home"? "ativo": ""}>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">Início</NavLink>
                    </li>
                    <li className={ativo==="Time"? "ativo": ""}>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/time">Time</NavLink>
                    </li>
                    <li className={ativo==="Contato"? "ativo": ""}>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contato">Contato</NavLink>
                    </li>
                    <li className='btnPro'>
                        <button>Sou Profissional</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;