import { useState, useContext } from "react";

import { UserCtx } from "../../context/UserCtx";
import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

const URL = import.meta.env.VITE_API;

export default function Login() {
  const { setIsLogged } = useContext(UserCtx);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [formAlert, setFormAlert] = useState({
    enable: false,
    type: "info",
    message: "",
  });

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const req = await fetch(`${URL}validate/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await req.json();
    const userRes = res?.user;
    console.log(req);
    console.log(res);

    if (!req.ok) {
      setFormAlert({
        enable: true,
        type: "error",
        message: "Invalid credentials",
      });
      return;
    }

    if (userRes) {
      localStorage.setItem("user", JSON.stringify(userRes));
      setIsLogged(true);
    }
  };

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...user,
      [name]: value,
    };

    setUser(newValues);
  };

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-6">
        <Alert
          enable={formAlert.enable}
          type={formAlert.type}
          message={formAlert.message}
        />
        <form
          className="flex flex-col justify-between items-center gap-4 w-1/2 bg-neutral-content p-8 my-10 rounded-2xl"
          onSubmit={handleSummit}>
          <h2 className="text-3xl">LogIn</h2>
          {/* Input email */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="email" className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Put your email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* Input password */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="password" className="label">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Put your password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* Button Submit */}
          <button
            type="submit"
            id="btnSummit"
            className="btn btn-primary text-white w-80">
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
