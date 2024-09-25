import Menu from '../Menu';
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
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
                style={{ cursor: location.pathname == "/" ? "auto" : "pointer" }}
                onClick={handleLogoClick}
            />
            
            <Menu />
        </nav>
    )
}

export default Header