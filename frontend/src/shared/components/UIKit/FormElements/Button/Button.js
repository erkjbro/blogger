import { Link } from 'react-router-dom';
import clsx from 'clsx';

import './Button.scss';

export const Button = (props) => {
  const {
    className,
    styles,
    children,
    inverse,
    danger,
    ...rest
  } = props;

  const classes = clsx(
    {
      "uikit__form-elements--button": true,
      "button--inverse": !!inverse,
      "button--danger": !!danger
    },
    className
  );

  if (rest.href) {
    const { href, rel, target, ...more } = rest;
    return (
      <a
        className={classes}
        styles={styles}
        href={href}
        rel={"noopener noreferrer" || rel}
        target={"_blank" || target}
        {...more}
      >
        {children}
      </a>
    );
  } else if (rest.to) {
    const { to, exact, ...more } = rest;
    return (
      <Link
        className={classes}
        styles={styles}
        to={to}
        exact={exact}
        {...more}
      >
        {children}
      </Link>
    );
  } else {
    const { type, onClick, disabled, ...more } = rest;
    return (
      <button
        className={classes}
        styles={styles}
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...more}
      >
        {children}
      </button>
    );
  }
};
