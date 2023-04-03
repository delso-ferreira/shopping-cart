export const getAddress = async (cep) => {
  const cartAdress = document.querySelector('.cart__address');
  const awesomeCep = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const brasilCep = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const statusOk = 200;
  // statusOk se refere a resposta da API onde a chave status nas duas API tem o retorno 200
  // caso exista erro a API retorna com 400 ou 404.
  let getAdress = '';
  try {
    if (awesomeCep.status !== statusOk || brasilCep.status !== statusOk) {
      console.log(awesomeCep);
      throw new Error('CEP não encontrado');
    }
    await Promise.any([awesomeCep, brasilCep])
      .then((result) => result.json())
      .then((data) => {
        if (brasilCep) {
          console.log('qualquerocoisa');
          getAdress = `${data.street} - ${data.neighborhood} - 
          ${data.city} - ${data.state}`;
          cartAdress.innerHTML = getAdress;
        }
        if (awesomeCep) {
          console.log('qualquerocoisa222');
          getAdress = `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
          cartAdress.innerHTML = getAdress;
        }
      });
  } catch (error) {
    cartAdress.innerHTML = error.message;
    console.log(error.message);
  }
};

export const searchCep = async () => {
  const inputCep = document.querySelector('.cep-input');
  await getAddress(inputCep.value);
};
