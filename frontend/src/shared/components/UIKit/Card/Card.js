import clsx from 'clsx';

import './Card.scss';

const Card = (props) => {
  const {
    className,
    styles,
    children,
    ...rest
  } = props;

  const classes = clsx(
    {
      uikit__card: true
    },
    className
  );

  return (
    <div
      className={classes}
      styles={styles}
      {...rest}
    >
      {children}
    </div>
  );
};

export { Card };
