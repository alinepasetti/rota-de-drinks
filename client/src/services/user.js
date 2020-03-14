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

// const editUserInformation = async data => {
//   // console.log(data);
//   const form = new FormData();
//   form.append('name', data.name);
//   form.append('email', data.email);
//   form.append('picture', data.picture);
//   const result = await instance.patch('/user-information', form);
//   const user = result.data.user;
//   return user;
// };

export { loadUserInformation, loadLoggedUserInformation };
