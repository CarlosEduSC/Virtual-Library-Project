import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { useState } from 'react';

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const [usuarioIsOpen, setUsuarioIsOpen] = useState(false)

    const [livroIsOpen, setLivroIsOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuIsOpen(!menuIsOpen)
        setUsuarioIsOpen(false)
        setLivroIsOpen(false)
    }

    const handleUsuarioClick = () => {
        setUsuarioIsOpen(!usuarioIsOpen)
        setLivroIsOpen(false)
    }

    const handleLivroClick = () => {
        setLivroIsOpen(!livroIsOpen)
        setUsuarioIsOpen(false)
    }

    return (
        <div className='menu'>
            <img
                className='menu-img'
                alt='Menu'
                src='/images/menu.png'
                onClick={handleMenuClick}
            />

            <ul className="menu-options" style={{ visibility: menuIsOpen ? "visible" : "hidden" }}>
                <li className="option" onClick={handleUsuarioClick}>Opções Usuario</li>
                <li className="option" onClick={handleLivroClick}>Opções Livro</li>
            </ul>

            <ul className="items-usuario" style={{ visibility: usuarioIsOpen ? "visible" : "hidden" }}>
                <li className="item">Cadastrar usuario</li>
                <li className="item">Atualizar dados de um usuario</li>
                <li className="item">Lista de usuarios</li>
            </ul>

            <ul className="items-livro" style={{ visibility: livroIsOpen ? "visible" : "hidden" }}>
                <li className='item'>Cadastrar livro</li>
                <li className='item'>Atualizar dados de um livro</li>
                <li className='item'>Lista de livros</li>
            </ul>
        </div>
    )
}

export default Menu