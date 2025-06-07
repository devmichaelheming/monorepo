import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useForm');
jest.mock('../../hooks/useRecommendations');

jest.mock('../../services/product.service', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([]),
}));

jest.mock('./Fields', () => ({
  Preferences: ({ onPreferenceChange }) => (
    <div>
      <button onClick={() => onPreferenceChange(['pref1'])}>Select Preference</button>
    </div>
  ),
  Features: ({ onFeatureChange }) => (
    <div>
      <button onClick={() => onFeatureChange(['feat1'])}>Select Feature</button>
    </div>
  ),
  RecommendationType: ({ onRecommendationTypeChange }) => (
    <div>
      <button onClick={() => onRecommendationTypeChange('SingleProduct')}>
        Select RecommendationType
      </button>
    </div>
  ),
}));

jest.mock('./SubmitButton', () => ({
  SubmitButton: ({ text }) => <button type="submit">{text}</button>,
}));

describe('Teste o componente Form:', () => {
  const mockSetRecommendations = jest.fn();
  const mockGetRecommendations = jest.fn();
  const mockHandleChange = jest.fn();

  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    useProducts.mockReturnValue({
      preferences: ['pref1', 'pref2'],
      features: ['feat1', 'feat2'],
      products: [],
    });

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations,
    });
  });

  test('renderiza o formulário com todos os campos', () => {
    render(<Form setRecommendations={mockSetRecommendations} />);

    expect(screen.getByText('Select Preference')).toBeInTheDocument();
    expect(screen.getByText('Select Feature')).toBeInTheDocument();
    expect(screen.getByText('Select RecommendationType')).toBeInTheDocument();
    expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
  });

  test('chama handleChange quando seleciona preferências, features e tipo', () => {
    render(<Form setRecommendations={mockSetRecommendations} />);

    fireEvent.click(screen.getByText('Select Preference'));
    expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', ['pref1']);

    fireEvent.click(screen.getByText('Select Feature'));
    expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', ['feat1']);

    fireEvent.click(screen.getByText('Select RecommendationType'));
    expect(mockHandleChange).toHaveBeenCalledWith('selectedRecommendationType', 'SingleProduct');
  });

  test('exibe alerta se campos obrigatórios estiverem vazios no submit', () => {
    window.alert = jest.fn();

    render(<Form setRecommendations={mockSetRecommendations} />);

    fireEvent.click(screen.getByText('Obter recomendação'));

    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, preencha todos os campos obrigatórios'
    );

    expect(mockSetRecommendations).not.toHaveBeenCalled();
    expect(mockGetRecommendations).not.toHaveBeenCalled();
  });

  test('chama setRecommendations com dados retornados de getRecommendations quando formulário preenchido', () => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: ['pref1'],
        selectedFeatures: ['feat1'],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: mockHandleChange,
    });

    const fakeRecommendations = [{ id: 1, name: 'Produto A' }];
    mockGetRecommendations.mockReturnValue(fakeRecommendations);

    render(<Form setRecommendations={mockSetRecommendations} />);

    fireEvent.click(screen.getByText('Obter recomendação'));

    expect(mockGetRecommendations).toHaveBeenCalledWith({
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feat1'],
      selectedRecommendationType: 'SingleProduct',
    });

    expect(mockSetRecommendations).toHaveBeenCalledWith(fakeRecommendations);
  });
});
