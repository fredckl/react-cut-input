import React from 'react';
import GenericInput from './GenericInput';
import propTypes from 'prop-types';
import useCutInput from '../hooks/useCutInput';
import { getInputName } from '../func';
import { is } from 'rambda';

const CutInput = ({
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
  } = useCutInput({
    sizes,
    transform,
    validator,
    value,
    onChange,
    pattern,
    exactPattern,
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

CutInput.propTypes = {
  sizes: propTypes.array,
  transform: propTypes.oneOfType([propTypes.string, propTypes.func]),
  Component: propTypes.func,
  className: propTypes.string,
  value: propTypes.string,
  validator: propTypes.string,
  pattern: propTypes.string,
  exactPattern: propTypes.bool,
  onChange: propTypes.func
};

export default CutInput;