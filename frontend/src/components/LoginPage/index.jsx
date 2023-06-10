import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import './styles.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const { authenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email === "admin" && password === "admin") {
            login(email, password); //integração com o contexto/api
            setError("");
            navigate("/home"); // Redirecionar para a página home
        } else {
            setError("Dados inválidos. Por favor, verifique seu usuário e senha.");
        }
    };

    return (
        <div className="autentication-container">
            <div className="autentication-box">
                <h2 className="autentication-title">Acesso Restrito</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite seu nome de usuário"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
                <div>
                    <Button className="btn" variant="success" onClick={handleSubmit}>Entrar</Button>
                    <Link to="/">
                        <Button className="btn" variant="danger">Voltar</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
