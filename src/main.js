import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

const productList = document.querySelector('.products');
const loadText = document.createElement('h1');
const apndBody = document.querySelector('body');
loadText.classList.add('loading');
loadText.innerHTML = 'Carregando ⏳';
document.querySelector('.cep-button').addEventListener('click', searchCep);
const saveCart = getSavedCartIDs();

const requisitionError = () => {
  const ReqError = document.createElement('h2');
  ReqError.classList.add('error');
  ReqError.innerHTML = '❌ Algum erro ocorreu, recarregue a página e tente novamente ❌';
  apndBody.appendChild(ReqError);
};

const getLoadOn = () => {
  apndBody.appendChild(loadText);
};

const getLoadOff = () => {
  apndBody.removeChild(loadText);
};

const handleLoad = async () => {
  getLoadOn();
  try {
    const getProducts = await fetchProductsList('computador');
    getProducts.forEach((element) => {
      const args = {
        id: element.id,
        title: element.title,
        thumbnail: element.thumbnail,
        price: element.price };
      productList.appendChild(createProductElement(args));
    });
  } catch {
    requisitionError();
  }
  getLoadOff();
};
handleLoad();

const sectionCart = document.querySelector('.cart__products');
const totalPriceElement = document.querySelector('.total-price');

let sumCart = 0;

const loadCart = async () => {
  const promisseArray = saveCart.map(
    (element) => fetchProduct(element),
  );
  const productData = await Promise.all(promisseArray);
  productData.map((objeto) => {
    sumCart += objeto.price;
    const cartProduct = createCartProductElement(objeto);
    sectionCart.appendChild(cartProduct);
    return productData;
  });
  totalPriceElement.innerHTML = sumCart.toFixed(1);
};
loadCart();
