import {useEffect} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {modalRoot} from '../../utils/document-elements';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { OrderModal } from '../OrderModal/OrderModal';

export const Modal = () => {
    const location = useLocation();
    const type = location.pathname.split('/');
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape);
        document.addEventListener('click', closeByClick);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
            document.removeEventListener('click', closeByClick);
        }
    })
    
    const closeByEscape = (e) => {
        if (e.key && e.key !== 'Escape'){
            return;
        }
        navigate(-1);
    }

    const closeByClick = (e) => {
        const classList = Array.from(e.target.classList);
        if (classList.filter(x=> x.includes('ModalOverlay')).length === 0  && e.target.tagName !== 'svg'){
            return;
        }
        navigate(-1);
    }
    return ReactDOM.createPortal ( 
        ( 
            <>
                <ModalOverlay/>
                <div className={`${style.container__main}`}>
                    {type.length >2 && type[1] === "ingredients" && <IngredientDetails/>}
                    {type.length >= 2 && type[1] === "send_order" && <OrderDetails/>}
                    {type.length >2 && type[1] === "feed" && <OrderModal />}
                    {type.length >2 && type[1] === "profile" && <OrderModal/>}
                    
                    <div className={`mr-10 mt-15 ${style.square}`}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </>
            
        ), modalRoot)
}
