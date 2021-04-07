import { createPortal } from 'react-dom';
import clsx from 'clsx';

import './Notification.scss';

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
        className={classes}
        styles={styles}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    ),
    document.getElementById('notification-hook')
  );
};
