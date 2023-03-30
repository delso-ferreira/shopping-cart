export const getAddress = async (cep) => {
  const cartAdress = document.querySelector('.cart__address');
  const awesomeCep = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const brasilCep = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  let getAdress = '';
  if (awesomeCep === undefined || brasilCep === undefined) {
    throw new Error('CEP não encontrado');
  }
  try {
    await Promise.any([awesomeCep, brasilCep])
      .then((result) => result.json())
      .then((data) => {
        getAdress = `${data.street} - ${data.neighborhood} - 
    ${data.city} - ${data.state}`
      || `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
      });
    cartAdress.innerHTML = getAdress;
  } catch (error) {
    cartAdress.innerHTML = error.message;
  }
};

export const searchCep = async () => {
  const inputCep = document.querySelector('.cep-input');
  await getAddress(inputCep.innerHTML);
};
