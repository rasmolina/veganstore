import { Link } from "react-router-dom";
import '../../components/AboutUs/styles.css';
import prod1 from '../../assets/img/prod1.png';
import prod2 from '../../assets/img/prod2.png';
import prod3 from '../../assets/img/prod3.png';

function AboutPage() {
    return (
        <div className="aboutus">          
            <div>
                <Link to="/login"><button className="btn">Login</button></Link>
            </div>
            <img src={prod1} alt="Produto 1" className="product-image" />
            <img src={prod2} alt="Produto 2" className="product-image" />
            <img src={prod3} alt="Produto 3" className="product-image" />
            <p>Bem-vindo à Vegan Store, o seu destino definitivo para produtos veganos de qualidade. Nós somos uma loja especializada em oferecer uma ampla variedade de alimentos, produtos de higiene pessoal, cosméticos e itens domésticos, todos eles totalmente livres de ingredientes de origem animal. Estamos comprometidos em fornecer opções éticas e sustentáveis para aqueles que optaram por um estilo de vida vegano ou que estão interessados em explorar uma abordagem mais compassiva ao consumo.</p>
            <p>Na Vegan Store, acreditamos que a escolha de produtos veganos não deve significar comprometer o sabor, a qualidade ou a diversidade. Nosso objetivo é tornar o estilo de vida vegano mais acessível e atrativo, oferecendo uma seleção abrangente de produtos que atendam a todos os gostos e necessidades.</p>
            <p>Nossa missão vai além de simplesmente oferecer produtos. Queremos educar e capacitar nossos clientes, fornecendo informações e recursos para ajudá-los em sua jornada vegana. Nossa equipe é composta por entusiastas e especialistas em produtos veganos, prontos para oferecer conselhos e recomendações personalizadas. Estamos aqui para ajudá-lo a descobrir novos sabores, experimentar receitas deliciosas e fazer escolhas informadas.</p>
            <p>Quando você visita a Vegan Store, pode ter certeza de que todos os nossos produtos são rigorosamente selecionados para atender aos mais altos padrões. Trabalhamos em estreita colaboração com fornecedores confiáveis ​​e respeitados, garantindo que cada item em nossas prateleiras seja livre de ingredientes de origem animal e tenha sido produzido de forma ética e sustentável. Além disso, também oferecemos uma variedade de produtos orgânicos e livres de ingredientes artificiais, para que você possa cuidar de si mesmo e do planeta de forma saudável.</p>
            <p>Na Vegan Store, acreditamos em apoiar pequenos produtores e marcas locais. Valorizamos a sustentabilidade e procuramos promover a economia local, oferecendo uma plataforma para que esses negócios floresçam. Ao comprar na nossa loja, você está contribuindo para a construção de uma comunidade mais forte e consciente.</p>
            <p></p>
        </div>
    )
}

export default AboutPage;