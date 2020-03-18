import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/payment-method'
});

const listPaymentMethods = async () => {
  const result = await instance.get('/list');
  const paymentMethods = result.data.paymentMethods;
  return paymentMethods;
};

const createPaymentMethod = async token => {
  await instance.post('/create', { token });
};

export { listPaymentMethods, createPaymentMethod };
