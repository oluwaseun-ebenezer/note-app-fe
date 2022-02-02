import axios from "axios";

export const createNote = async (title, description) => {
  const user = JSON.parse(localStorage.getItem("n_a_user"));

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_HOST}/note`, {
      user_id: user.uid,
      title,
      description,
    })
    .then((data) => data)
    .catch((error) => error.response);
};

export const updateNote = async (id, title, description) => {
  const user = JSON.parse(localStorage.getItem("n_a_user"));

  return axios
    .put(`${process.env.NEXT_PUBLIC_API_HOST}/note`, {
      id,
      user_id: user.uid,
      title,
      description,
    })
    .then((data) => data)
    .catch((error) => error.response);
};

export const deleteNote = async (id) => {
  const user = JSON.parse(localStorage.getItem("n_a_user"));

  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_HOST}/note`, {
      data: {
        user_id: user.uid,
        id,
      },
    })
    .then((data) => data)
    .catch((error) => error.response);
};

export const fetchNotes = async (uid) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_HOST}/note/all/${uid}`)
    .then((data) => data)
    .catch((error) => error.response);
};

export const fetchNote = async (uid, note_id) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_HOST}/note/${uid}/${note_id}`)
    .then((data) => data)
    .catch((error) => error.response);
};
