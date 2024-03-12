import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <form className=" absolute p-12 bg-black mx-auto my-40 w-5/12 right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-4xl my-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
        />

        <input
          type="password"
          placeholder="Password"
          className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
        />
        <button
          type="submit"
          className="cursor-pointer p-4 w-full bg-red-600 my-6 rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-4">
          {!isSignInForm ? "Already Registered? " : "New to Netflix? "}
          <span
            onClick={toggleSignInForm}
            className="cursor-pointer text-lg font-bold"
          >
            {!isSignInForm ? "Sign In Now" : "Sign Up Now"}
          </span>
        </p>
      </form>
      <div>
        <img
          className="h-[100vh] w-[100%]"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background"
        />
      </div>
    </div>
  );
};

export default Login;
