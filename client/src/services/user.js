import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/user'
});

const loadUserInformation = async userId => {
  const result = await instance.get(`/profile/${userId}`);
  const user = result.data.user;
  return user;
};

const loadLoggedUserInformation = async () => {
  const result = await instance.get(`/loggedUser`);
  const user = result.data.user;
  return user;
};

const editUserInformation = async data => {
  const form = new FormData();
  form.append('firstName', data.firstName);
  form.append('lastName', data.lastName);
  form.append('email', data.email);
  form.append('city', data.city);
  form.append('about', data.about);
  form.append('picture', data.picture);
  const result = await instance.patch(`/profile/${data.userId}/edit`, form);
  const user = result.data.user;
  return user;
};

export { loadUserInformation, loadLoggedUserInformation, editUserInformation };
