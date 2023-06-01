import { useState } from "react";

import Footer from "../../components/Footer";
import Alert from "../../components/Alert";

const URL = import.meta.env.VITE_API;

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
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

    const req = await fetch(`${URL}add/user/regular`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res = await req.json();

    console.log(req);

    setFormAlert(
      req.ok
        ? {
            enable: true,
            type: "success",
            message: "Success Signup",
          }
        : {
            enable: true,
            type: "error",
            message: "Signup Error",
          }
    );
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
          <h2 className="text-3xl">Sign Up</h2>
          {/* Input name */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="name" className="label">
              <span className="label-text text-base">Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Put your name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* Input last name */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="lastname" className="label">
              <span className="label-text text-base">Last Name</span>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={user.lastname}
              onChange={handleChange}
              placeholder="Put your last name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
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
