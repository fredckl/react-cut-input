import useCutInput from '../../src/cut-input/useCutInput';
import { renderHook, act } from '@testing-library/react-hooks';

describe('Test useCutInput', () => {
  it('should contain 3 states', () => {
    const sizes = [2, 2, 2];
    const { result } = renderHook(() => useCutInput({ sizes }));
    const { state } = result.current;
    expect(state).toEqual({
      n0: '',
      n1: '',
      n2: ''
    });
  });

  it('should contain 3 values in states', () => {
    const sizes = [2, 2, 2];
    const value = 'ABCDEF';
    const { result } = renderHook(() => useCutInput({ sizes, value }));
    const { state } = result.current;

    expect(state).toEqual({
      n0: 'AB',
      n1: 'CD',
      n2: 'EF'
    });
  });

  it('should contain an last empty string value', () => {
    const sizes = [2, 2, 2];
    const value = 'abcd';
    const { result } = renderHook(() => useCutInput({ sizes, value }));
    const { state } = result.current;
    expect(state).toEqual({
      n0: 'ab',
      n1: 'cd',
      n2: ''
    });
  });

  it('should contain an last value transformed to uppercase', () => {
    const sizes = [2, 2, 2];
    const value = 'abcd';
    const transform = 'uppercase';
    const { result } = renderHook(() => useCutInput({ sizes, value, transform }));
    act(() => result.current.handleChange('xy', 0));
    act(() => result.current.handleChange('ef', 2));
    expect(result.current.state).toEqual({
      n0: 'XY',
      n1: 'cd',
      n2: 'EF'
    });
  });

  it('should contain an last value transformed to lowercase', () => {
    const sizes = [2, 2, 2];
    const transform = 'lowercase';
    const { result } = renderHook(() => useCutInput({ sizes, transform }));
    act(() => result.current.handleChange('XY', 0));
    act(() => result.current.handleChange('EF', 2));
    expect(result.current.state).toEqual({
      n0: 'xy',
      n1: '',
      n2: 'ef'
    });
  });

  it('should writing state with validator', () => {
    const sizes = [2, 2, 2];
    const validator = '\\d';
    const { result } = renderHook(() => useCutInput({ sizes, validator }));
    act(() => result.current.handleChange('XY', 0));
    act(() => result.current.handleChange('10', 1));
    act(() => result.current.handleChange('EF', 2));
    expect(result.current.state).toEqual({
      n0: '',
      n1: '10',
      n2: ''
    });
  });

  it('should splitting value with defined global pattern', () => {
    const sizes = [2, 2, 2];
    const pattern = '\\d';
    const value = '101112';
    const { result } = renderHook(() => useCutInput({ sizes, pattern, value }));
   
    expect(result.current.state).toEqual({
      n0: '10',
      n1: '11',
      n2: '12'
    });
  });

  it('should splitting value with custom pattern', () => {
    const sizes = [2, 2, { pattern: '\\w{3}'}];
    const pattern = '\\d';
    const value = '1011ABC';
    const { result } = renderHook(() => useCutInput({ sizes, pattern, value }));
   
    expect(result.current.state).toEqual({
      n0: '10',
      n1: '11',
      n2: 'ABC'
    });
  });

  it('should validate value with custom validator', () => {
    const sizes = [2, 2, { validator: '\\[a-z]+'}];
    const pattern = '\\d';
    const value = '101112';
    const { result } = renderHook(() => useCutInput({ sizes, pattern, value }));
    act(() => result.current.handleChange('1234', 2));
    expect(result.current.state).toEqual({
      n0: '10',
      n1: '11',
      n2: ''
    });
  });
});