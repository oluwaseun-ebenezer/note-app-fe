import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { deleteNote, fetchNote } from "../../../services/note";
import PrivateLayout from "../../../components/PrivateLayout";

export default function Note({ status, note, messageIn }) {
  const router = useRouter();
  const mountedRef = useRef(true);

  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState(messageIn);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("n_a_user"));
    if (Object.keys(note).length > 0) {
      if (note.user_id == user.uid) {
        setValid(true);
      } else {
        router.push(`/note/me/${user.uid}`);
      }
    } else {
      router.push(`/note/me/${user.uid}`);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [router]);

  const removeNote = (e) => {
    e.preventDefault();

    deleteNote(note._id.$oid).then((res) => {
      try {
        if (res.status == 200) {
          router.push(`/note/me/${note.user_id}`);
          setMessage(res.data.message);
        } else if (res.status == 400 || res.status == 401) {
          router.push(`/note/me/${note.user_id}`);
          setMessage(res.data.message);
        } else {
          message = "Unknown error occured!";
        }
      } catch {
        message = "Unknown error occured!";
      }
    });
  };

  return (
    <PrivateLayout siteTitle="Create Note">
      <section className="grid justify-items-center w-full p-12">
        {message ? (
          <p className="p-2 rounded-md my-1 bg-red-400 w-max text-center text-white">
            {message}
          </p>
        ) : (
          <>
            <div className="w-6/12 flex justify-between justify-self-center">
              <button
                className="py-2 px-8 bg-red-500 my-4 rounded-md text-white"
                onClick={removeNote}
              >
                Delete
              </button>
              <button
                className="py-2 px-8 bg-gray-500 my-4 rounded-md text-white"
                onClick={() => {
                  router.push(`/note/me/edit/${note._id.$oid}`);
                }}
              >
                Edit
              </button>
            </div>
            <h1 className="text-3xl p-12">{note.title}</h1>
            <p>{note.description}</p>
          </>
        )}
      </section>
    </PrivateLayout>
  );
}

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { uid, id } = params;

  return fetchNote(uid, id).then((res) => {
    if (res.status == 200) {
      return {
        props: {
          status: true,
          note: res.data,
          message: "Note loaded successfully",
        },
      };
    } else {
      return {
        props: {
          status: false,
          message: "Error getting note",
          note: {},
        },
      };
    }
  });
};
