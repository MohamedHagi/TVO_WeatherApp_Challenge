import React, { useState } from "react";

export default function Signin({ handleSignin, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [signinError, setSigninError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignin(email);
      setSigninError(null);
    } catch (error) {
      setSigninError(error.response.data.error);
    }
  };
  return (
    <div>
      <form
        className="flex items-center flex-col bg-white rounded shadow-lg p-12 mt-12"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xs" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="flex items-center h-12 px-4 my-2 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          type="submit"
        >
          Sign in
        </button>
        <button
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          type="submit"
          onClick={() => {
            setShowSignup(true);
          }}
        >
          Sign Up
        </button>
      </form>
      {signinError && <p>{signinError}</p>}
    </div>
  );
}
