import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './ModalOverlay.module.css';
import {modalRoot} from '../../utils/document-elements'


export const ModalOverlay = ({isOpen}) => {

    const [visible, setVisible] = React.useState(false);

    React.useEffect(()=> {
        setVisible(isOpen);
    }, [isOpen]);

    return ReactDOM.createPortal(
        (<>
            {
                visible &&
                <div className={`${style.container__main}`}/>
            }
        </>
        ), modalRoot
    )

}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool
}; 