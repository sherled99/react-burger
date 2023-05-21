import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {modalRoot} from '../../utils/document-elements';
import { getIngredients } from '../../services/actions/burger';
import { openModal } from '../../services/actions';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { OrderModal } from '../OrderModal/OrderModal';
import { WS_CONNECTION_START } from '../../services/actions/feed';
import { WS_USER_CONNECTION_START } from '../../services/actions/personal_feed';

export const Modal = () => {
    const location = useLocation();
    const type = location.pathname.split('/');
    const ingredients = useSelector(state => state.burgerState.burgerIngredients);
    const burgerConfig = useSelector(state => state.initialReducer.burgerConfig);
    const wsReducer = useSelector(state => state.wsReducer.messages);
    const personlFeedReducer = useSelector(state => state.personlFeedReducer.messages);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape);
        document.addEventListener('click', closeByClick);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
            document.removeEventListener('click', closeByClick);
        }
    })

    useEffect(() => {
        if (type.length > 2 && ( type[1] === "feed" || type[1] === "profile")){
            dispatch({ type: WS_CONNECTION_START });
            dispatch({ type: WS_USER_CONNECTION_START });
        }
      }, [dispatch]);

      useEffect(() => {
        if (ingredients.length === 0 && type.length > 2 && type[1] === "ingredients"){
            if (Object.keys(burgerConfig).length === 0){
                dispatch(getIngredients());
            } else {
                const data = ingredients.find(x => x._id === id);
                dispatch(openModal("Burger", data)); 
            }
        } else if (ingredients.length > 0 && type.length > 2 && type[1] === "ingredients"){
            const data = ingredients.find(x => x._id === id);
            dispatch(openModal("Burger", data)); 
        }
      }, [ingredients]);
    
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
                    {type.length >2 && type[1] === "feed" && <OrderModal data={wsReducer} />}
                    {type.length >2 && type[1] === "profile" && <OrderModal data={personlFeedReducer}/>}
                    
                    <div className={`mr-10 mt-15 ${style.square}`}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                <Outlet/>
            </>
            
        ), modalRoot)
}
