import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { useEffect, useRef, useState } from 'react';
// import getUserTypeFromToken from '../../shared/methods/user/GetUserTypeFromToken';

const Menu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const [usuarioIsOpen, setUsuarioIsOpen] = useState(false)

    const [livroIsOpen, setLivroIsOpen] = useState(false)

    // const [type, setType] = useState("")

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         const usertype = getUserTypeFromToken(token);
    //         setType(usertype);
    //     }
    // }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuIsOpen(false)
            setUsuarioIsOpen(false)
            setLivroIsOpen(false)
          }
        }
    
        if (menuIsOpen) {
          document.addEventListener("click", handleClickOutside)
        }
    
        return () => {
          document.removeEventListener("click", handleClickOutside)
        }
      }, [menuIsOpen])

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
        <div className='menu' ref={menuRef}>
            <img
                className='menu-img'
                alt='Menu'
                src='/images/menu.png'
                onClick={handleMenuClick}
            />

            <ul className="menu-options" style={{ visibility: menuIsOpen ? "visible" : "hidden" }}>
                <li className="option" onClick={handleUsuarioClick}>
                    <img className='option-img' alt='Opções Usuario' src='/images/user.png' />
                    Opções usuario
                </li>
                <li className="option" onClick={handleLivroClick}>
                    <img className='option-img' alt='Opções Livro' src='/images/book.png' />
                    Opções Livro
                </li>
            </ul>

            <ul className="items-usuario" style={{ visibility: usuarioIsOpen ? "visible" : "hidden" }}>
                <li className="item">
                    <img className='option-img' alt='Cadastrar Usuario' src='/images/add-user.png' />
                    Cadastrar usuario
                </li>
                <li className="item">
                    <img className='option-img' alt='Atualizar dados de um usuario' src='/images/edit-user.png' />
                    Atualizar dados de um usuario
                </li>
                <li className="item">
                    <img className='option-img' alt='Lista de Usuarios' src='/images/list.png' />
                    Lista de usuarios
                </li>
            </ul>

            <ul className="items-livro" style={{ visibility: livroIsOpen ? "visible" : "hidden" }}>
                <li className='item'>
                    <img className='option-img' alt='Cadastrar Livro' src='/images/add.png' />
                    Cadastrar livro
                </li>
                <li className='item'>
                    <img className='option-img' alt='Atualizar dados de um livro' src='/images/edit.png' />
                    Atualizar dados de um livro
                </li>
                <li className='item'>
                    <img className='option-img' alt='Lista de livros' src='/images/list.png' />
                    Lista de livros
                </li>
            </ul>
        </div>
    )
}

export default Menu