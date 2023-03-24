import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';


describe('Teste a função fetchProduct', () => {
   it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
  });
  
  it('verifica se a função fetchProduct() retorna o endpoint correto para o argumento MLB1405519561', async () => {
  await fetchProduct('MLB1405519561');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it ('Testa se o fetch é invocado', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  
  it('Testar se o retorno da função com o argumento MLB1405519561 tem a estrutura igual a products.js', async () => {
    const matchObject = await fetchProduct('MLB1405519561')
    expect(matchObject).toEqual(product);
  });
  })
  
  it('Chamar a função sem argumento retorna ID não informado', async () => {
  await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });