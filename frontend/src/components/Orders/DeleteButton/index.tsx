import api from '../../../service/api';
import { toast } from 'react-toastify';
import icon from '../../../assets/img/delete-button.svg';
import './styles.css';

type Props = {
    orderId: number;
}

function handleClick(id: number) {
    api
        .delete(`/order/${id}/delete`)
        .then(response => toast.info("Pedido deletado com sucesso"));
    window.location.reload();
}

function DeleteButton({ orderId }: Props) {
    return (
        <div className="order-red-btn" onClick={() => handleClick(orderId)}>
            <img src={icon} alt="Delete" />
        </div>
    )
}

export default DeleteButton;