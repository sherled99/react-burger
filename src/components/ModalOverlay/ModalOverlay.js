import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './ModalOverlay.module.css';

const modalRoot = document.getElementById("react-modals");


export const ModalOverlay = ({children, isOpen}) => {

    const [visible, setVisible] = React.useState(false);

    React.useEffect(()=> {
        setVisible(isOpen);
    }, [isOpen]);

    return ReactDOM.createPortal(
        (<>
            {
                visible &&
                <div className={`${style.container__main}`}>
                    {children}
                </div>
            }
        </>
        ), modalRoot
    )

}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool
}; 