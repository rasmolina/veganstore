import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState } from "react";

import './styles.css';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import { Order } from "../../models/order";
import api from '../../service/api';
import { Link } from 'react-router-dom';

function Orders() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = ({
        orderStatus: "",
        totalValue: "",
        productId: "",
        customerId: ""
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
        const orderToSave = {
            orderStatus: formData.orderStatus,
            totalValue: formData.totalValue,
            productId: formData.productId,
            customerId: formData.customerId
        };

        api
            .post(`/order/save`, orderToSave)
            .then(response => console.log("Posting data: ", response))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
        setShow(false);
        window.location.reload();
    };

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api
            .get(`/order/`)
            .then((response) => setOrders(response.data))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    return (
        <div className="card">
            <Modal show={show} onHide={handleClose} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Novo Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control className='formControl'
                                type="number"
                                placeholder="ID do Produto"
                                onChange={handleChange}
                                name="productId" />

                            <Form.Control className='formControl'
                                type="number"
                                placeholder="ID do  Cliente"
                                onChange={handleChange}
                                name="customerId" />

                            <Form.Control className='formControl'
                                type="text"
                                placeholder="Status do Pedido"
                                onChange={handleChange}
                                name="orderStatus" />

                            <Form.Control className='formControl'
                                type="number"
                                placeholder="Valor da Compra (R$)"
                                onChange={handleChange}
                                name="totalValue" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Incluir Pedido
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='order-header'>
                <button className="btn-new-order" onClick={handleShow}>Novo Pedido</button>
                <Link to="/home"><button className="btn-new-order">Home</button></Link>
            </div>

            <table className="order-table">
                <thead>
                    <tr className="show-cell">
                        <th>ID</th>
                        <th>ID Produto</th>
                        <th>ID Cliente</th>
                        <th>Status</th>
                        <th>Valor da Compra</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.productId}</td>
                            <td>{order.customerId}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.totalValue}</td>
                            <td>
                                <div className="order-red-btn-container">
                                    <EditButton orderSelected={order} />
                                </div>
                            </td>
                            <td>
                                <div className="order-red-btn-container">
                                    <DeleteButton orderId={order.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;