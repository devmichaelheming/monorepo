import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('Testa o componente RecommendationList:', () => {
  test('exibe o título da lista', () => {
    render(<RecommendationList recommendations={[]} />);
    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });

  test('exibe mensagem quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);
    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  test('renderiza uma lista com recomendações', () => {
    const mockData = [
      { name: 'Produto A' },
      { name: 'Produto B' },
      { name: 'Produto C' },
    ];

    render(<RecommendationList recommendations={mockData} />);

    expect(screen.queryByText('Nenhuma recomendação encontrada.')).not.toBeInTheDocument();

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
