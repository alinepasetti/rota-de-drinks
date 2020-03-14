import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/authentication'
});

const signUp = async data => {
  const result = await instance.post('/sign-up', data);
  const user = result.data.user;
  return user;
};

const signIn = async data => {
  const result = await instance.post('/sign-in', data);
  const user = result.data.user;
  return user;
};

const signOut = async () => {
  await instance.post('/sign-out');
};

export { signIn, signUp, signOut };
