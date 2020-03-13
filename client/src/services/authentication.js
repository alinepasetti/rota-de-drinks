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

// const loadUserInformation = () =>
//   new Promise((resolve, reject) => {
//     instance
//       .get('/user-information')
//       .then(result => {
//         const user = result.data.user;
//         resolve(user);
//       })
//       .catch(reject);
//   });

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

export { signIn, signUp, signOut };
// export { signIn, signUp, signOut, loadUserInformation, editUserInformation };
