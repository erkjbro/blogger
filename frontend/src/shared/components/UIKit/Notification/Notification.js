import { forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import './Notification.scss';

const NotificationOverlay = forwardRef((props, ref) => {
  const {
    className,
    styles,
    onCancel,
    children,
    ...rest
  } = props;

  const classes = clsx(
    {
      uikit__notification: true,
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
        onClick={onCancel}
        {...rest}
      >
        {children}
      </div>
    ),
    document.getElementById('notification-hook')
  );
});

export const Notification = (props) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="uikit__notification"
    >
      <NotificationOverlay ref={nodeRef} {...props} />
    </CSSTransition>
  );
};
