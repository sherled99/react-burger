import {useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {ModalOverlay} from '../ModalOverlay/ModalOverlay';
import {modalRoot} from '../../utils/document-elements';

interface ModalProps {
    children: React.ReactNode;
  }

export const Modal: FC<ModalProps> = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape);
        document.addEventListener('click', closeByClick);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
            document.removeEventListener('click', closeByClick);
        }
    })
    
    const closeByEscape = (e: KeyboardEvent | undefined) => {
        if (e?.key && e.key !== 'Escape'){
            return;
        }
        navigate(-1);
    }

    const closeByClick = (e: MouseEvent | undefined) => {
        if (!e) {
          return;
        }
        const classList: Array<string> = Array.from((e.target as Element).classList);
        if (
          classList?.filter((x: string) => x?.includes('ModalOverlay'))?.length === 0 &&
          (e.target as Element).tagName !== 'svg'
        ) {
          return;
        }
        navigate(-1);
      };

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
            
        ), modalRoot);
}
