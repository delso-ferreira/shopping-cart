export const fetchProduct = async (id) => {
  const searchID = 'https://api.mercadolibre.com/items/';
  if (!id) {
    throw new Error('ID não informado');
  }
  const fetchRequest = await fetch(`${searchID}${id}`);
  const fetchResult = await fetchRequest.json();
  const getFetchResult = fetchResult;
  return getFetchResult;
};

export const fetchProductsList = async (param) => {
  const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  if (!param) {
    throw new Error('Termo de busca não informado');
  }
  const fetchRequest = await fetch(`${apiURL}${param}`);
  const fetchResult = await fetchRequest.json();
  const pesquisa = fetchResult.results;
  return pesquisa;
};
