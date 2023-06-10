import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState } from "react";

import './styles.css';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import { Product } from "../../models/product";
import api from '../../service/api';
import { Link } from 'react-router-dom';

function Products() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialFormData = ({
        name: "",
        description: "",
        costPrice: "",
        salePrice: "",
        provider: ""
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
        const productToSave = {
            name: formData.name,
            description: formData.description,
            costPrice: formData.costPrice,
            salePrice: formData.salePrice,
            provider: formData.provider
        };

        api
            .post(`/product/save`, productToSave)
            .then(response => console.log("Posting data: ", response))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
        setShow(false);
        window.location.reload();
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [nameOrProviderToFInd, setNameOrProviderToFind] = useState("");

    useEffect(() => {
        api
            .get(`/product/${nameOrProviderToFInd}`)
            .then((response) => setProducts(response.data))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, [nameOrProviderToFInd]);

    useEffect(() => {
        api
            .get(`/product/`)
            .then((response) => setProducts(response.data))
            .catch((err) => {
                console.error("Ops! Ocorreu um erro!" + err);
            });
    }, []);

    return (
        <div className="card">
            <Modal show={show} onHide={handleClose} className="modal-container">
                <Modal.Header closeButton>
                    <Modal.Title>Novo Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control className='formControl'
                                type="text"
                                placeholder="Produto"
                                onChange={handleChange}
                                name="name" />

                            <Form.Control className='formControl'
                                type="text"
                                placeholder="Descrição do produto"
                                onChange={handleChange}
                                name="description" />

                            <Form.Control className='formControl'
                                type="text"
                                placeholder="Provedor"
                                onChange={handleChange}
                                name="provider" />

                            <Form.Control className='formControl'
                                type="number"
                                placeholder="Valor de custo (R$)"
                                onChange={handleChange}
                                name="costPrice" />

                            <Form.Control className='formControl'
                                type="number"
                                placeholder="Valor de venda (R$)"
                                onChange={handleChange}
                                name="salePrice" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Incluir Produto
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='product-header'>
                <button className="btn-new-product" onClick={handleShow}>Novo Produto</button>
                <Link to="/home"><button className="btn-new-product">Home</button></Link>
                <h2 className="product-title">Buscar Produto</h2>
                <div className="product-form-control-container">
                    <input
                        className="product-form-control"
                        type="text"
                        value={nameOrProviderToFInd}
                        onChange={(e) => setNameOrProviderToFind(e.target.value)}
                        placeholder='Digite o produto ou seu provedor' />
                </div>
            </div>

            <table className="product-table">
                <thead>
                    <tr className="show-cell">
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Provedor</th>
                        <th>Valor de Custo</th>
                        <th>Valor de Venda</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.provider}</td>
                            <td>{product.costPrice}</td>
                            <td>{product.salePrice}</td>
                            <td>
                                <div className="product-red-btn-container">
                                    <EditButton productSelected={product} />
                                </div>
                            </td>
                            <td>
                                <div className="product-red-btn-container">
                                    <DeleteButton productId={product.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;