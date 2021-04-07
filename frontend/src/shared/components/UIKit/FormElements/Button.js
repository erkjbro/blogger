import clsx from 'clsx';

import './FormElements.scss';

export const Button = (props) => {
  const {
    className,
    styles,
    children,
    ...rest
  } = props;

  const classes = clsx(
    {
      "uikit__form-elements--button": true
    },
    className
  );

  return (
    <button
      className={classes}
      styles={styles}
      {...rest}
    >
      {children}
    </button>
  );
};
