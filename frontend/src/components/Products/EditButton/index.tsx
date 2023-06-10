import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useState } from "react";

import './styles.css';

import api from '../../../service/api';
import { Product } from '../../../models/product';
import icon from '../../../assets/img/edit-button.svg';

type Props = {
    productSelected: Product
}

function EditButton({ productSelected }: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = ({
        name: productSelected.name,
        description: productSelected.description,
        costPrice: productSelected.costPrice,
        salePrice: productSelected.salePrice,
        provider: productSelected.provider
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

        const productToSave = {
            name: formData.name,
            description: formData.description,
            costPrice: formData.costPrice,
            salePrice: formData.salePrice,
            provider: formData.provider
        };

        api
            .put(`/product/${productSelected.id}/update`, productToSave)
            .then(response => console.log("Posting data: ", response))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
        setShow(false);
        window.location.reload();
    };

    return (
        <div>
            <div className="product-red-btn" onClick={handleShow}>
                <img src={icon} alt="Edit" />
            </div>

            <Modal show={show} onHide={handleClose} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            Produto
                            <Form.Control className='formControl'
                                type="text"
                                placeholder={productSelected.name}
                                onChange={handleChange}
                                name="name"
                            />

                            Descrição do produto
                            <Form.Control className='formControl'
                                type="text"
                                onChange={handleChange}
                                name="description"
                                placeholder={productSelected.description} />

                            Provedor
                            <Form.Control className='formControl'
                                type="text"
                                onChange={handleChange}
                                name="provider"
                                placeholder={productSelected.provider} />

                            Valor de custo (R$)
                            <Form.Control className='formControl'
                                type="number"
                                onChange={handleChange}
                                name="costPrice"
                                placeholder={productSelected.costPrice} />

                            Valor de venda (R$)
                            <Form.Control className='formControl'
                                type="number"
                                onChange={handleChange}
                                name="salePrice"
                                placeholder={productSelected.salePrice} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="warning" onClick={handleSubmit}>
                        Alterar Produto
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditButton;