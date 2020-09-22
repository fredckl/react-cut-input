import { both, is, join, length, mergeLeft, path, pathOr, prop, toLower, toUpper, values, when } from 'rambda';
import { useRef, useState } from 'react';
import { formatDefaultValues, formatSizes, formatValues, getInputName } from './func';
import { MAX_LENGTH, VALIDATOR, TRANSFORM } from './constants';


const useCutInput = ({
  sizes,
  transform,
  validator,
  value,
  onChange,
  pattern,
  exactPattern
}) => {
  const newSizes = formatSizes(sizes);

  const ref = useRef();
  const [state, setState] = useState({
    ...formatDefaultValues(newSizes),
    ...formatValues(value, newSizes, pattern, exactPattern)
  });

  const getSizeProp = (arrayPath) => path(arrayPath)(newSizes);
  const getMaxLength = (index) => getSizeProp([index, MAX_LENGTH]);
  const getValidator = (index) => getSizeProp([index, VALIDATOR]);
  const getTransform = (index) => getSizeProp([index, TRANSFORM]);
  const getValues = value => values(value);
  const concatValues = value => join('', getValues(value));

  const handleChange = (value, index) => {
    if (!checkMaxLength(value, getMaxLength(index))) return null;
    let newValue = checkValidator(value, index);
    newValue = transformValue(newValue, index);
    const mergedValues = mergeLeft({ [getInputName(index)]: newValue }, state);
    setState(mergedValues);
    const children = pathOr([], ['current', 'children'], ref);

    // Go to next input
    when(
      both(prop(index + 1), () => length(newValue) === getMaxLength(index)),
      () => children[index + 1].focus()
    )(pathOr([], ['current', 'children'], ref));

    if (is(Function, onChange)) {
      onChange(concatValues(mergedValues), getValues(mergedValues));
    }
  };

  const checkMaxLength = (value, len) => value.length <= len;
  const checkValidator = (value, index) => {
    const regex = getValidator(index) || validator;
    if (value && regex && !(new RegExp(regex, 'gi')).test(value)) {
      return prop(getInputName(index), state);
    }
    return value;
  };

  const transformValue = (value, index) => {
    transform = getTransform(index) || transform;
    if (is(Function, transform)) {
      return transform(value);
    }

    if (is(String, transform)) {
      let newValue;

      switch (transform) {
        case 'uppercase':
          newValue = toUpper(value);
          break;
        case 'lowercase':
          newValue = toLower(value);
          break;
        default:
          newValue = value;
      }
      return newValue;
    }

    return value;
  };

  return {
    state,
    ref,
    handleChange
  };
};

export default useCutInput;