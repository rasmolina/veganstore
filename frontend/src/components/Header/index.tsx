import './styles.css';
import logo from '../../assets/img/logo.png';

function Header() {
    return (
        <header>
        <div className="logo-container">
                <img src={logo} alt="logo" />
                <div>
                <p>Desenvolvido por Pedro Zoia | Roberto Molina | Vinicius Laroza</p>                
            </div>
            
        </div>
        </header>
    )
}

export default Header;