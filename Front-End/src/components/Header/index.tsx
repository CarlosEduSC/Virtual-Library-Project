import Menu from '../Menu';
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    

    const handleLogoClick = () => {
        if (location.pathname != "/") {
            navigate("/")
        }
    }

    return (
        <nav className="header">
            <img
                className='logo-img'
                src='/images/icon.png'
                alt='Logo' 
                style={{ cursor: location.pathname == "/" || location.pathname == "/login" ? "auto" : "pointer" }}
                onClick={handleLogoClick}
            />
            
            {location.pathname != "/login" && <Menu />}
        </nav>
    )
}

export default Header