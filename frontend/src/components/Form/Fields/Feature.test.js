import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features';

describe('Testa o componente Feature:', () => {
  const mockFeatures = ['Chat', 'Dashboard', 'Relatórios'];
  const mockOnFeatureChange = jest.fn();

  test('deve renderizar os checkboxes corretamente', () => {
    render(<Features features={mockFeatures} onFeatureChange={mockOnFeatureChange} />);

    mockFeatures.forEach((feature) => {
      expect(screen.getByLabelText(feature)).toBeInTheDocument();
    });
  });

  test('deve marcar os checkboxes passados em selectedFeatures', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={['Dashboard']}
        onFeatureChange={mockOnFeatureChange}
      />
    );

    const checkbox = screen.getByLabelText('Dashboard');
    expect(checkbox).toBeChecked();
  });

  test('deve alternar o estado do checkbox ao clicar', () => {
    render(<Features features={mockFeatures} onFeatureChange={mockOnFeatureChange} />);

    const checkbox = screen.getByLabelText('Chat');
    fireEvent.click(checkbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith(['Chat']);

    fireEvent.click(checkbox);
    expect(mockOnFeatureChange).toHaveBeenCalledWith([]);
  });
});
