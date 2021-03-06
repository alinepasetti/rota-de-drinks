import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/purchase'
});

const listPurchases = async () => {
  const result = await instance.get('/list');
  const purchases = result.data.purchases;
  return purchases;
};

const createPurchase = async (eventId, selectedPaymentMethodIndex) => {
  let result = await instance.post('/create', { eventId, selectedPaymentMethodIndex });
  return result;
};

export { listPurchases, createPurchase };
