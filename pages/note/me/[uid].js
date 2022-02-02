import { fetchNotes } from "../../../services/note";
import PrivateLayout from "../../../components/PrivateLayout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function AllNote({ uid, status, notes, message }) {
  const router = useRouter();
  const mountedRef = useRef(true);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("n_a_user"));
    if (user) {
      if (user.uid == uid) {
        setValid(true);
      } else {
        router.push(`/note/me/${user.uid}`);
      }
    }

    return () => {
      mountedRef.current = false;
    };
  }, [router]);

  return (
    <PrivateLayout siteTitle="All Notes">
      <section className="grid justify-items-center w-full py-12">
        <h1 className="text-3xl p-12">All Notes</h1>
        {status == false ? (
          <p className="p-2 rounded-md my-1 bg-red-400 w-max text-center text-white">
            {message}
          </p>
        ) : (
          ""
        )}
        {notes.length > 0 && valid ? (
          <table className="table-fixed border-collapse w-full text-left">
            <thead>
              <tr>
                <th className="w-3/12 ...">S/N</th>
                <th className="w-9/12 ...">Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, key) => (
                <tr key={key}>
                  <td className="py-1.5">{key + 1}</td>
                  <td>{note.title}</td>
                  <td>
                    <Link href={`/note/${uid}/${note._id.$oid}`}>
                      <a className="underline hover:text-blue-600">Open</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No notes to display</p>
        )}
      </section>
    </PrivateLayout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { uid } = params;

  return fetchNotes(uid).then((res) => {
    if (res.status == 200) {
      return {
        props: {
          uid,
          status: true,
          notes: res.data,
          message: "Notes loaded successfully",
        },
      };
    } else {
      return {
        props: {
          uid,
          status: false,
          message: "Error getting notes",
          notes: [],
        },
      };
    }
  });
}
