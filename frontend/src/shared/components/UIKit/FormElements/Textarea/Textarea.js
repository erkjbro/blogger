import clsx from 'clsx';

import './FormElements.scss';

export const Textarea = (props) => {
  const {
    className,
    styles,
    ...rest
  } = props;

  const classes = clsx(
    {
      "uikit__form-elements--textarea": true
    },
    className
  );

  return (
    <label>
      <textarea
        className={classes}
        styles={styles}
        {...rest}
      />
    </label>
  );
};
