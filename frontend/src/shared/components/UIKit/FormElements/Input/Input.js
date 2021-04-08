import clsx from 'clsx';

import './FormElements.scss';

export const Input = (props) => {
  const {
    className,
    styles,
    ...rest
  } = props;

  const classes = clsx(
    {
      "uikit__form-elements--input": true
    },
    className
  );

  return (
    <label>
      <input
        className={classes}
        styles={styles}
        {...rest}
      />
    </label>
  );
};
