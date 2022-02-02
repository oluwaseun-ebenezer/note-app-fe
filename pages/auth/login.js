import { useRouter, withRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import Layout from "../../components/Layout";
import { loginUser } from "../../services/user";

export default withRouter(function LogIn() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);

  const login = (e) => {
    e.preventDefault();
    if (
      userEmail.match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      ) &&
      userPassword
    ) {
      loginUser(userEmail, userPassword).then((res) => {
        try {
          if (res.status == 200) {
            router.push({
              pathname: `/note/me/${res.data.id}`,
              state: { success: res.data.message },
            });
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

  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleUserPasswordChange = (e) => setUserPassword(e.target.value);

  return (
    <Layout siteTitle="Log In">
      <section className="grid justify-items-center w-full py-12">
        {router.query.success ? (
          <p className="py-2 my-2 bg-green-400 w-6/12 text-center text-white">
            {router.query.success}
          </p>
        ) : (
          ""
        )}
        <h1 className="text-3xl p-12">Login</h1>
        {errorMsgs.map((errorMsg, key) => (
          <p
            key={key}
            className="p-2 rounded-md my-1 bg-red-400 w-max text-center text-white"
          >
            {errorMsg}
          </p>
        ))}
        <form onSubmit={login} className="w-full max-w-md">
          <InputBox
            placeholder="Email Address"
            type="email"
            name="email"
            handlechange={handleUserEmailChange}
          />
          <InputBox
            placeholder="Password"
            type="password"
            name="password"
            handlechange={handleUserPasswordChange}
          />
          <Button name="login" label="Login" type="submit" />
        </form>
      </section>
    </Layout>
  );
});
