import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([]),
}));

const mockProducts = [
  {
    id: 1,
    name: 'Produto A',
    preferences: ['Automação', 'Captação de leads', 'Inbound'],
    features: ['Chatbot', 'Landing Pages', 'Email Marketing'],
  },
  {
    id: 2,
    name: 'Produto B',
    preferences: ['Vendas', 'Conversão'],
    features: ['CRM', 'Integrações', 'Funil'],
  },
];

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve buscar produtos e preencher preferences e features', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products.length).toBeGreaterThan(0);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.preferences.length).toBeGreaterThan(0);
    expect(result.current.features.length).toBeGreaterThan(0);
  });

  test('deve lidar com erro na requisição', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    getProducts.mockRejectedValue(new Error('Erro de rede'));

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
