import { useRouter } from "next/router";
import PrivateLayout from "../../../components/PrivateLayout";
import { createNote } from "../../../services/note";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import { useState } from "react";

export default function CreateNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [description, setDescription] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);

  const addNote = (e) => {
    e.preventDefault();

    if ((title, description)) {
      setMessage("Creating note");
      createNote(title, description).then((res) => {
        try {
          if (res.status == 201) {
            const user = JSON.parse(localStorage.getItem("n_a_user"));

            setMessage(res.data.message);
            router.push(`/note/${user.uid}/${res.data.id}`);
          } else if (res.status == 400 || res.status == 401) {
            setErrorMsgs([res.data.message]);
          } else {
            setErrorMsgs(["Unknown error occured!"]);
          }
        } catch {
          setErrorMsgs(["Unknown error occured!"]);
        }
      });
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  return (
    <PrivateLayout siteTitle="Create Note">
      <section className="grid justify-items-center w-full p-12">
        <h1 className="text-3xl p-12">Create Note</h1>
        {errorMsgs.map((errorMsg, key) => (
          <p
            key={key}
            className="p-2 rounded-md my-1 bg-red-400 w-max text-center text-white"
          >
            {errorMsg}
          </p>
        ))}
        {message ? (
          <p className="p-2 rounded-md my-1 bg-gray-400 w-max text-center text-white">
            {message}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={addNote} className="w-full max-w-md">
          <InputBox
            placeholder="Title"
            type="text"
            name="title"
            handlechange={handleTitleChange}
          />
          <InputBox
            placeholder="Description"
            type="text"
            name="description"
            handlechange={handleDescriptionChange}
          />
          <Button name="create_note" label="Create Note" type="submit" />
        </form>
      </section>
    </PrivateLayout>
  );
}
