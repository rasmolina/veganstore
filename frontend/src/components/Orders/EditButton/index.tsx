import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from "react";

import './styles.css';

import api from '../../../service/api';
import { Order } from '../../../models/order';
import icon from '../../../assets/img/edit-button.svg';

type Props = {
    orderSelected: Order
}

function EditButton({ orderSelected }: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = ({
        orderStatus: orderSelected.orderStatus,
        totalValue: orderSelected.totalValue,
        productId: orderSelected.productId,
        customerId: orderSelected.customerId
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
        console.log(formData);

        const orderToSave = {
            orderStatus: formData.orderStatus,
            totalValue: formData.totalValue,
            productId: formData.productId,
            customerId: formData.customerId
        };

        api
            .put(`/order/${orderSelected.id}/update`, orderToSave)
            .then(response => console.log("Posting data: ", response))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
        setShow(false);
        window.location.reload();
    };

    return (
        <div>
            <div className="order-red-btn" onClick={handleShow}>
                <img src={icon} alt="Edit" />
            </div>

            <Modal show={show} onHide={handleClose} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            Status
                            <Form.Control className='formControl'
                                type="text"
                                placeholder={orderSelected.orderStatus}
                                onChange={handleChange}
                                name="orderStatus"
                            />

                            Valor da Compra (R$)
                            <Form.Control className='formControl'
                                type="number"
                                placeholder={orderSelected.totalValue}
                                onChange={handleChange}
                                name="totalValue" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="warning" onClick={handleSubmit}>
                        Alterar Pedido
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditButton;