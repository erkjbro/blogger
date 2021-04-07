import { createPortal } from 'react-dom';
import clsx from 'clsx';

import './Backdrop.scss';

export const Backdrop = (props) => {
  const {
    className,
    styles,
    onClick,
    ...rest
  } = props;

  const classes = clsx(
    {
      uikit__backdrop: true,
      transparent: false,
      opaque: false
    },
    className
  );

  return createPortal(
    <div
      className={classes}
      styles={styles}
      onClick={onClick}
      {...rest}
    ></div>,
    document.getElementById('backdrop-hook')
  );
};
