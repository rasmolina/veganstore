import { Link } from "react-router-dom";
import './styles.css';

function HomePage() {
    return (
        <div className="menubar">
            <h1>Seja Bem Vindo à Vegan Store</h1>
            
            <Link to="/customer"><button className="btn">Clientes</button></Link>
            <Link to="/product"><button className="btn">Produtos</button></Link>
            <Link to="/order"><button className="btn">Pedidos</button></Link>
            <Link to="/"><button className="btn">Logout</button></Link>
        </div>
    )
}

export default HomePage;