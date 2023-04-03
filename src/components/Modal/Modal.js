import {useEffect} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {modalRoot} from '../../utils/document-elements';

export const Modal = ({children, onClose}) => {
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
        onClose();
    }

    const closeByClick = (e) => {
        const classList = Array.from(e.target.classList);
        if (classList.filter(x=> x.includes('ModalOverlay')).length === 0  && e.target.tagName !== 'svg'){
            return;
        }
        onClose();
    }

    return ReactDOM.createPortal ( 
        ( 
            <>
                <ModalOverlay/>
                <div className={`${style.container__main}`}>
                    {children}
                    <div className={`mr-10 mt-15 ${style.square}`}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </>
            
        ), modalRoot)
}
