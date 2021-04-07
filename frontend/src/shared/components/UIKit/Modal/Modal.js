import { createPortal } from 'react-dom';
import clsx from 'clsx';

import './Modal.scss';

export const Backdrop = (props) => {
  const {
    className,
    styles,
    onClick,
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
        className={classes}
        styles={styles}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    ),
    document.getElementById('modal-hook')
  );
};
