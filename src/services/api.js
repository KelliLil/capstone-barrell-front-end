import ky from "ky";

const BASE_URL = "http://localhost:3000/api";

export default {
  // 'credentials' is an object with 'username' and 'password' properties
  // This is taken care of by React Hook Form when we submitted the form
  register(credentials) {
    return ky
      .post("http://localhost:3000/api/users/create", {
        json: credentials,
      })
      .json();
  },
  login(credentials) {
    return ky.post(`${BASE_URL}/users/login`, { json: credentials }).json();
  },
};
