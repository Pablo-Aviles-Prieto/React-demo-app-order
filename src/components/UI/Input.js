import classes from './Input.module.css';
import React from 'react';

export const Input = React.forwardRef(({ label, input }, ref) => {

  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});
