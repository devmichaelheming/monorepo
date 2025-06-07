import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('Testa o hook useForm:', () => {
  test('deve inicializar com os valores fornecidos', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  });

  test('deve atualizar o campo corretamente', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'Michael');
    });

    expect(result.current.formData).toEqual({ name: 'Michael', email: '' });
  });
});
