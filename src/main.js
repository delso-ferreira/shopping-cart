import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const productList = document.querySelector('.products');
const getProducts = await fetchProductsList('computador');
const loadText = document.createElement('h1');
const container = document.querySelector('.container');
loadText.classList.add('loading');
loadText.innerHTML = 'carregando...';
document.querySelector('.cep-button').addEventListener('click', searchCep);

const requisitionError = () => {
  const ReqError = document.createElement('h2');
  ReqError.classList.add('error');
  ReqError.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  container.appendChild(ReqError);
};

const getLoadOn = () => {
  container.appendChild(loadText);
};

const getLoadOff = () => {
  container.removeChild(loadText);
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

const handleLoad = async () => {
  getLoadOn();
  try {
    await fetchProductsList('computador');
    productsReturn();
  } catch (_error) {
    requisitionError();
  }
  getLoadOff();
};
handleLoad();
