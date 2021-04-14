import { forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import { Backdrop } from '..';
import './Modal.scss';

const ModalOverlay = forwardRef((props, ref) => {
  const {
    className,
    styles,
    header,
    children,
    ...rest
  } = props;

  const classes = clsx(
    {
      uikit__modal: true,
      info: false,
      success: false,
      warn: false,
      error: false
    },
    className
  );

  return createPortal(
    (
      <div
        ref={ref}
        className={classes}
        styles={styles}
        {...rest}
      >
        <header className="uikit__modal--header">
          <h2>{header}</h2>
        </header>
        <div className="uikit__modal--content">
          {children}
        </div>
      </div>
    ),
    document.getElementById('modal-hook')
  );
});

export const Modal = (props) => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="uikit__modal"
      >
        <ModalOverlay ref={nodeRef} {...props} />
      </CSSTransition>
    </>
  );
};
