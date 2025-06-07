import { renderHook } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service');

describe('useRecommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve chamar getRecommendations com os parâmetros corretos e retornar resultado', async () => {
    const mockProducts = [{ id: 1, name: 'Produto 1' }];
    const mockFormData = { preference: 'CRM' };
    const mockResult = [{ id: 101, name: 'Recomendação 1' }];

    recommendationService.getRecommendations.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    const response = await result.current.getRecommendations(mockFormData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(mockFormData, mockProducts);
    expect(response).toEqual(mockResult);
  });
});
