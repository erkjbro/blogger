import { createPortal } from 'react-dom';
import clsx from 'clsx';

import Backdrop from '../Backdrop/Backdrop';

const ModalOverlay = (props) => {
  const {
    children,
    header,
    footer,
    style,
    ...rest
  } = props;

  const modalClasses = clsx({
    modal: true
  });

  const headerClasses = clsx({
    modal__header: true
  });

  const contentClasses = clsx({
    modal__content: true
  });

  const footerClasses = clsx({
    modal_footer: true
  });

  const content = (
    <div
      className={modalClasses}
      style={style}
      {...rest}
    >
      <header className={headerClasses}>
        <h2>{header}</h2>
      </header>
      <div className={contentClasses}>
        {children}
      </div>
      <footer className={footerClasses}>
        {footer}
      </footer>
    </div>
  );

  return createPortal(
    content,
    document.getElementById('modal-hook')
  );
};

const Modal = (props) => (
  <>
    {props.show && <Backdrop onClick={props.onCancel} />}
    {props.show && <ModalOverlay {...props} />}
  </>
);

export default Modal;