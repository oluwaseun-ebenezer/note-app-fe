import axios from "axios";

export const createUser = async (name, email, password) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_HOST}/user/signup`, {
      name,
      email,
      password,
    })
    .then((data) => data)
    .catch((error) => error.response);
};

export const loginUser = async (email, password) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_HOST}/user/login`, {
      email,
      password,
    })
    .then((data) => {
      localStorage.setItem(
        "n_a_user",
        JSON.stringify({
          token: data.data.token,
          uid: data.data.id,
          email: data.data.email,
        })
      );
      return data;
    })
    .catch((error) => error.response);
};

export const verifyUser = async (email, id, token) => {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_HOST}/user/verify`,
      {
        email,
        id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((data) => data)
    .catch((error) => {
      localStorage.removeItem("n_a_user");
      return error.response;
    });
};
