import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { verifyUser } from "../services/user";

export default withRouter(({ children, siteTitle }) => {
  const router = useRouter();
  const mountedRef = useRef(true);

  const [blur, setBlur] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setBlur(true);
    });
    router.events.on("routeChangeComplete", () => {
      setBlur(false);
    });
    router.events.on("routeChangeError", () => {
      setBlur(false);
    });

    return () => {
      mountedRef.current = false;
    };
  }, [router]);

  const [session, setSession] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("n_a_user"));

    if (user) {
      verifyUser(user.email, user.uid, user.token).then((valid) => {
        try {
          if (valid.status != 200) {
            router.push({
              pathname: "/auth/login",
            });
          } else {
            setSession(true);
          }
        } catch {
          localStorage.removeItem("n_a_user");
          router.push({
            pathname: "/auth/login",
          });
        }
      });
    } else {
      localStorage.removeItem("n_a_user");
      router.push({
        pathname: "/auth/login",
      });
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="grid">
      {session ? (
        <>
          <Head>
            <title>{siteTitle}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="Note Application" />
            <meta name="og:title" content={siteTitle} />
          </Head>

          <div className="w-6/12 flex justify-between justify-self-center">
            <button
              className="py-2 px-8 bg-red-500 my-4 rounded-md text-white"
              onClick={() => {
                localStorage.removeItem("n_a_user");
                router.push("/auth/login");
              }}
            >
              Logout
            </button>
            <button
              className="py-2 px-8 bg-green-500 my-4 rounded-md text-white"
              onClick={() => {
                router.push("/note/me/create");
              }}
            >
              Create Note
            </button>
            <button
              className="py-2 px-8 bg-blue-500 my-4 rounded-md text-white"
              onClick={() => {
                router.push(
                  `/note/me/${JSON.parse(localStorage.getItem("n_a_user")).uid}`
                );
              }}
            >
              Home
            </button>
          </div>

          <main className="w-6/12 justify-self-center">{children}</main>
          {blur ? (
            <div className="w-full h-max bg-gray-600 absolute opacity-50"></div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
});
