import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import Layout from "../../components/Layout";
import { createUser } from "../../services/user";

export default function SignUp() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);

  const signup = (e) => {
    e.preventDefault();
    if (
      userName &&
      userEmail.match(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      ) &&
      userPassword
    ) {
      createUser(userName, userEmail, userPassword).then((res) => {
        try {
          if (res.status == 201) {
            router.push({
              pathname: "/auth/login",
              query: { success: res.data.message },
            });
          } else if (res.status == 400 || res.status == 401) {
            setErrorMsgs([...res.data.message]);
          } else {
            setErrorMsgs(["Unknown error occured!"]);
          }
        } catch {
          setErrorMsgs(["Unknown error occured!"]);
        }
      });
    }
  };

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleUserPasswordChange = (e) => setUserPassword(e.target.value);

  return (
    <Layout siteTitle="Sign Up">
      <section className="grid justify-items-center w-full py-12">
        <h1 className="text-3xl p-12">Sign Up</h1>
        {errorMsgs.map((errorMsg, key) => (
          <p
            key={key}
            className="p-2 rounded-md my-2 bg-red-400 w-max text-center text-white"
          >
            {errorMsg}
          </p>
        ))}
        <form onSubmit={signup} className="w-full max-w-md pt-8">
          <InputBox
            placeholder="Name"
            type="text"
            name="name"
            value={userName}
            handlechange={handleUserNameChange}
          />
          <InputBox
            placeholder="Email Address"
            type="email"
            name="email"
            value={userEmail}
            handlechange={handleUserEmailChange}
          />
          <InputBox
            placeholder="Password"
            type="password"
            name="password"
            value={userPassword}
            handlechange={handleUserPasswordChange}
          />
          <Button name="signup" label="Signup" type="submit" />
        </form>
      </section>
    </Layout>
  );
}
