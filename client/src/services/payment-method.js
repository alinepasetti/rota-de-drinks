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
  const newPaymentMethod = await instance.post('/create', { token });
  return newPaymentMethod.data.paymentMethod;
};

export { listPaymentMethods, createPaymentMethod };
