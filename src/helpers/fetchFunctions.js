export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (param) => {
  const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  if (!param) {
    throw new Error('Termo de busca não informado');
  }
  try {
    const fetchRequest = await fetch(`${apiURL}${param}`);
    const fetchResult = await fetchRequest.json();
    const pesquisa = fetchResult.results;
    return pesquisa;
  } catch (error) {
    console.log(error.message);
  }
};
