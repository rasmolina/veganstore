import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState } from "react";

import './styles.css';

import { Customer } from '../../models/customer'
import api from '../../service/api';
import { Link } from 'react-router-dom';

function Customers() {
    const [show, setShow] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = ({
        cpf: "",
        email: "",
        name: ""
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        const customerToSave = {
            cpf: formData.cpf,
            email: formData.email,
            name: formData.name
        };

        api
            .post(`/customer/save`, customerToSave)
            .then(response => {
                console.log("Posting data: ", response);
                setShow(false);
                window.location.reload();
                setShowSuccessMessage(true); // Exibir mensagem de sucesso ao inserir o cliente
                setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar mensagem de sucesso após 3 segundos
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    };

        /*api
            .post(`/customer/save`, customerToSave)
            .then(response => console.log("Posting data: ", response))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
        setShow(false);
        
        window.location.reload();
    };*/


    const [customers, setCustomers] = useState<Customer[]>([]);
    const [cpfOrEmailToFind, setCpfOrEmailToFind] = useState("");

    useEffect(() => {
        api
            .get("/customer/")
            .then((response) => setCustomers(response.data))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    useEffect(() => {
        api
            .get(`/customer/${cpfOrEmailToFind}`)
            .then((response) => setCustomers(response.data))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, [cpfOrEmailToFind]);

    return (
        <div className="card">
            <Modal show={show} onHide={handleClose} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Novo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control className='formControl'
                                type="text"
                                placeholder="Nome"
                                onChange={handleChange}
                                name="name" />

                            <Form.Control className='formControl'
                                type="text"
                                placeholder="CPF"
                                onChange={handleChange}
                                name="cpf" />

                            <Form.Control className='formControl'
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                name="email" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Incluir Cliente
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='customer-header'>
                <button className="btn-new-customer" onClick={handleShow}>Novo Cliente</button>
                <Link to="/home"><button className="btn-new-customer">Home</button></Link>
                <h2 className="customer-title">Buscar Cliente</h2>
                <div className="customer-form-control-container">
                    <input
                        className="customer-form-control"
                        type="text"
                        value={cpfOrEmailToFind}
                        onChange={(e) => setCpfOrEmailToFind(e.target.value)}
                        placeholder='Digite o CPF ou email do cliente' />
                </div>
            </div>

            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customers;