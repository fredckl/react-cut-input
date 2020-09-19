import { is } from 'rambda';
import React from 'react';
import GenericInput from './GenericInput';
import { getInputName } from './func';
import propTypes from 'prop-types';
import useSplitterInput from './useSplitterInput';

const SplitterInput = ({
  sizes,
  transform,
  Component,
  value,
  onChange,
  validator,
  pattern,
  exactPattern,
  className
}) => {
  const {
    state,
    ref,
    handleChange
  } = useSplitterInput({
    sizes,
    transform,
    validator,
    value,
    onChange,
    pattern,
    exactPattern
  });

  const Input = is(Function, Component) ? Component : GenericInput;
  return (
    <div ref={ref} className={`split-input-container ${className}`}>
      {Object.keys(state).map((v, i) => (
        <Input
          key={i}
          value={state[getInputName(i)]}
          onChange={(e) => handleChange(e.target.value, i)}/>
      ))}
    </div>
  );
};

SplitterInput.propTypes = {
  sizes: propTypes.array.isRequired,
  transform: propTypes.oneOfType([propTypes.string, propTypes.func]),
  Component: propTypes.func,
  className: propTypes.string,
  value: propTypes.string,
  validator: propTypes.string,
  pattern: propTypes.string,
  exactPattern: propTypes.bool,
  onChange: propTypes.func
};

export default SplitterInput;