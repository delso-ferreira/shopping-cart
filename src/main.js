import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productList = document.querySelector('.products');
const getProducts = await fetchProductsList('computador');

getProducts.forEach((element) => {
  const objeto = {
    id: element.id,
    title: element.title,
    thumbnail: element.thumbnail,
    price: element.price };
  return createProductElement(objeto).appendChild(productList);
});
