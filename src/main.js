import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const productList = document.querySelector('.products');
const getProducts = await fetchProductsList('computador');
console.log(getProducts);
const loadText = document.createElement('h1');
const container = document.querySelector('.container');
loadText.classList.add('loading');
loadText.innerHTML = 'carregando...';
document.querySelector('.cep-button').addEventListener('click', searchCep);
/* const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q='; */

const requisitionError = () => {
  const ReqError = document.createElement('h2');
  ReqError.classList.add('error');
  ReqError.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  container.appendChild(ReqError);
};

const productsReturn = () => {
  getProducts.forEach((element) => {
    const args = {
      id: element.id,
      title: element.title,
      thumbnail: element.thumbnail,
      price: element.price };
    productList.appendChild(createProductElement(args));
  });
};
productsReturn();

const getLoadOn = () => {
  container.appendChild(loadText);
};

const getLoadOff = () => {
  container.removeChild(loadText);
};

const handleLoad = async () => {
  getLoadOn();
  if (getProducts === undefined) {
    throw new Error('teste');
  }
  try {
    await fetchProductsList('computador');
    getLoadOff();
  } catch (error) {
    console.log(error.message);
  }
};
handleLoad();
