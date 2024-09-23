import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { useState } from 'react';

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuIsOpen(!menuIsOpen)
    }
    return (
        <div className='menu'>
            <img
                className='menu-img'
                alt='Menu'
                onClick={handleMenuClick}
            />

            <ul className="menu-options" style={{ visibility: menuIsOpen ? "visible" : "hidden" }}>
                <li className="option">
                    <a className="option-label">Opções Usuario</a>
                    <ul className="items">
                        <li className="item" >Cadastrar usuario</li>
                        <li className="item">Atualizar dados de um usuario</li>
                        <li className="item">Lista de usuarios</li>
                    </ul>
                </li>
                <li className="option">
                    <a className='option-label'>Opções Livro</a>
                    <ul className="items">
                        <li className='item'>Cadastrar livro</li>
                        <li className='item'>Atualizar dados de um livro</li>
                        <li className='item'>Lista de livros</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Menu