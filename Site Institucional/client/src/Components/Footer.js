import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className='contNavbarFooter'>
                <ul className='navbarFooter'>
                    <li><NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">Início</NavLink></li>
                    <li><NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/time">Time</NavLink></li>
                    <li><NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/contato">Contato</NavLink></li>
                </ul>
            </div>
            <div className='contLogoFooter'>
                <img className='logoFooter' src='https://i.imgur.com/wKDE0xz.png'></img>
            </div>
        </div>
    );
}

export default Footer;