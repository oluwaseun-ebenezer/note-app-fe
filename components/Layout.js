import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter, withRouter } from "next/router";

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

  const [session, useSession] = useState(true);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("n_a_user"));

    if (user) {
      router.push(`/note/me/${user.uid}`);
    } else {
      useSession(false);
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="grid">
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Note Application" />
        <meta name="og:title" content={siteTitle} />
      </Head>{" "}
      <div className="w-6/12 flex justify-between justify-self-center">
        <button
          className="py-2 px-8 bg-blue-500 my-4 rounded-md text-white"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login
        </button>
        <button
          className="py-2 px-8 bg-green-500 my-4 rounded-md text-white"
          onClick={() => {
            router.push("/auth/signup");
          }}
        >
          Signup
        </button>
      </div>
      {session == false ? (
        <main className="w-6/12 justify-self-center">{children}</main>
      ) : (
        ""
      )}
      {blur ? (
        <div className="w-full h-max bg-gray-600 absolute opacity-50"></div>
      ) : (
        ""
      )}
    </div>
  );
});
