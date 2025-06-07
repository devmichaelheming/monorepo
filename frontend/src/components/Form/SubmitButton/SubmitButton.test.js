import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('Teste o componente SubmitButton:', () => {
  test('renderiza o texto corretamente', () => {
    render(<SubmitButton text="Enviar" />);
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });
});
