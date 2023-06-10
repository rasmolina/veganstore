import api from '../../../service/api';
import { toast } from 'react-toastify';
import icon from '../../../assets/img/delete-button.svg';
import './styles.css';

type Props = {
    productId: number;
}

function handleClick(id: number) {
    api
        .delete(`/product/${id}/delete`)
        .then(response => toast.info("Produto deletado com sucesso"));
    window.location.reload();
}

function DeleteButton({ productId }: Props) {
    return (
        <div className="product-red-btn" onClick={() => handleClick(productId)}>
            <img src={icon} alt="Delete" />
        </div>
    )
}

export default DeleteButton;