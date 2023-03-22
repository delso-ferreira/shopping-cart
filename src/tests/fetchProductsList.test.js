import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    const functionType = fetchProductsList;
    expect(functionType).toEqual(expect.any(Function));
    // https://stackoverflow.com/questions/50818474/how-to-test-if-the-type-of-the-result-is-a-javascript-function-in-jest
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    const resultado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=computador`);
    const result = await resultado.json();
    expect(result).toHaveProperty('results')
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador').then((data) =>{
    expect(data).toEqual(computadorSearch)});
  });
  it('Testa se ao chamar a função fetchProductsList sem argumento retorna a mensagem de erro Termo de busca não informado', () => {
      expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado')
  })
});
