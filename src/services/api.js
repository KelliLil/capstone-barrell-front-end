import ky from "ky";

const BASE_URL = "http://localhost:3000/api";

export default {
  loginOrRegister(credentials, isRegistering) {
    return ky
      .post(`${BASE_URL}/user/${isRegistering ? "create" : "login"}`, {
        json: credentials,
      })
      .json();
  },
};
