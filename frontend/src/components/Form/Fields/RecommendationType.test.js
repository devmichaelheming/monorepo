import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from './RecommendationType';

describe('Testa o componente RecommendationType:', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('deve renderizar os dois radio buttons', () => {
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  test('deve chamar onRecommendationTypeChange com "SingleProduct"', () => {
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    const radioSingle = screen.getByLabelText('Produto Único');
    fireEvent.click(radioSingle);

    expect(mockOnChange).toHaveBeenCalledWith('SingleProduct');
  });

  test('deve chamar onRecommendationTypeChange com "MultipleProducts"', () => {
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    const radioMultiple = screen.getByLabelText('Múltiplos Produtos');
    fireEvent.click(radioMultiple);

    expect(mockOnChange).toHaveBeenCalledWith('MultipleProducts');
  });
});
