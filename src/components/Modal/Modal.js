import {useEffect} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {modalRoot} from '../../utils/document-elements'

export const Modal = ({isOpen, children, onClose}) => {
    useEffect(() => {
        document.addEventListener('keydown', onClick);
        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('keydown', onClick);
            document.removeEventListener('click', onClick);
        }
    })
    


    const onClick = (e) => {
        if (e.type === 'click'){
            const classList = Array.from(e.target.classList);
            if (classList.filter(x=> x.includes('ModalOverlay')).length === 0  && e.target.tagName !== 'svg'){
                return;
            }
        }
        if (e.key && e.key !== 'Escape'){
            return;
        }
        onClose();
    }

    return ReactDOM.createPortal ( 
        ( 
            <>
                { isOpen && 
                <div className={`${style.container__main}`}>
                    {children}
                    <div className={`mr-10 mt-15 ${style.square}`}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                }
            </>
            
        ), modalRoot)
}
