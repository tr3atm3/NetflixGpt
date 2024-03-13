import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  const handleButtonClick = (e) => {
    e.preventDefault();

    //validating the form data

    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    // Sign In sign up logic

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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
            ref={name}
            type="text"
            placeholder="Full Name"
            className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="block p-4 my-4 w-full bg-gray-700 rounded-lg text-xl"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          type="submit"
          onClick={handleButtonClick}
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
