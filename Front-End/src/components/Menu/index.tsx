import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'
import { useEffect, useRef, useState } from 'react';
import getUserTypeFromToken from '../../shared/methods/user/GetUserTypeFromToken';
// import getUserTypeFromToken from '../../shared/methods/user/GetUserTypeFromToken';

const Menu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const [usuarioIsOpen, setUsuarioIsOpen] = useState(false)

    const [livroIsOpen, setLivroIsOpen] = useState(false)

    const [type, setType] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const usertype = getUserTypeFromToken(token);
            setType(usertype);
        }
    }, []);

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
        if (type == "ADMIN") {
            setMenuIsOpen(!menuIsOpen)
            setUsuarioIsOpen(false)
            setLivroIsOpen(false)

        } else {
            setLivroIsOpen(!livroIsOpen)
        }
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

            {type == "ADMIN" &&
                <ul className="menu-options" style={{ visibility: menuIsOpen ? "visible" : "hidden" }}>

                    <li className="option" onClick={handleUsuarioClick}>
                        <img className='option-img' alt='Opções Usuario' src='/images/user.png' />

                        Opções usuario
                    </li>


                    <li className="option" onClick={handleLivroClick}>
                        <img className='option-img' alt='Opções Livro' src='/images/book.png' />

                        Opções Livro
                    </li>

                    <li className="option" onClick={() => navigate("/login")}>
                        <img className='option-img' alt='Sair' src='/images/log-out.png' />

                        Sair
                    </li>
                </ul>
            }

            <ul className="items-usuario" style={{ visibility: usuarioIsOpen ? "visible" : "hidden" }}>

                {location.pathname != "/createUser" &&
                    <li className="item" onClick={() => navigate("/createUser", { state: { from: location.pathname } })}>
                        <img className='option-img' alt='Cadastrar Usuario' src='/images/add-user.png' />

                        Cadastrar usuario
                    </li>
                }

                {location.pathname != "/listUsers" &&
                    <li className="item" onClick={() => navigate("/listUsers")}>
                        <img className='option-img' alt='Lista de Usuarios' src='/images/list.png' />

                        Lista de usuarios
                    </li>
                }
            </ul>

            <ul className={type == "ADMIN" ? "items-livro" : "menu-options"} style={{ visibility: livroIsOpen ? "visible" : "hidden" }}>

                {type != "READER" ?

                    (location.pathname != "/createBook" &&
                        <li className='item' onClick={() => navigate("/createBook", { state: { from: location.pathname } })}>
                            <img className='option-img' alt='Cadastrar Livro' src='/images/add.png' />

                            Cadastrar livro
                        </li>
                    )


                    :
                    <li className="option">
                        <img className='option-img' alt='Perfil' src='/images/user.png' />

                        Perfil
                    </li>
                }

                {location.pathname != "/listBooks" &&
                    <li className={type == "ADMIN" ? "item" : "option"} onClick={() => navigate("/listBooks")}>
                        <img className='option-img' alt='Lista de livros' src='/images/list.png' />

                        Lista de livros
                    </li>
                }

                {type == "READER" &&

                    <li className="option" onClick={() => navigate("/login")}>
                        <img className='option-img' alt='Sair' src='/images/log-out.png' />

                        Sair
                    </li>

                }
            </ul>
        </div>
    )
}

export default Menu