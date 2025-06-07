import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences';

describe('Testa o componente Preferences:', () => {
  const mockPreferences = ['Econômico', 'Completo', 'Simples'];
  const mockOnPreferenceChange = jest.fn();

  beforeEach(() => {
    mockOnPreferenceChange.mockClear();
  });

  test('deve renderizar os checkboxes corretamente', () => {
    render(<Preferences preferences={mockPreferences} onPreferenceChange={mockOnPreferenceChange} />);

    mockPreferences.forEach((preference) => {
      expect(screen.getByLabelText(preference)).toBeInTheDocument();
    });
  });

  test('deve marcar os checkboxes passados em selectedPreferences', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={['Completo']}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const checkbox = screen.getByLabelText('Completo');
    expect(checkbox).toBeChecked();
  });

  test('deve alternar o estado do checkbox ao clicar', () => {
    render(<Preferences preferences={mockPreferences} onPreferenceChange={mockOnPreferenceChange} />);

    const checkbox = screen.getByLabelText('Simples');

    fireEvent.click(checkbox);
    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['Simples']);

    fireEvent.click(checkbox);
    expect(mockOnPreferenceChange).toHaveBeenCalledWith([]);
  });
});
