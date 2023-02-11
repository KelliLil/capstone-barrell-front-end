import ky from "ky";

const BASE_URL = "http://localhost:3000/api";

export default {
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
