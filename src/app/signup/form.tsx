"use client";
import { useActionState } from "react";
import { signup } from "../actions/auth";
import { SignupActionResponse } from "../lib/definitions";

const initialState: SignupActionResponse = {
  success: false,
  message: "",
};

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form action={action} className=" flex flex-col gap-4 w-[30rem]">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={state?.inputs?.name}
          className="w-full py-2 border rounded-lg px-4"
          placeholder="Enter your name"
        />
      </div>
      {state?.errors?.name && (
        <p className="text-sm text-red-500">{state.errors.name}</p>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={state.inputs?.email}
          className="w-full border py-2 rounded-lg px-4"
          placeholder="yourname@domain.com"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-sm text-red-500">{state.errors.email}</p>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={state.inputs?.password}
          className="w-full border py-2 rounded-lg px-4"
          placeholder="your password"
        />
      </div>

      {state?.errors?.password && (
        <div className="text-sm text-red-500">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {state?.message && (
        <div
          className={`${
            state.success ? "border-green-500" : "border-red-500"
          } border py-3 px-4 rounded-lg `}
        >
          {state.success && (
            <span className="material-symbols-outlined text-green-500 flex">
              check_circle
            </span>
          )}
          <p>{state.message}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white py-2 rounded-lg"
      >
        {" "}
        {pending ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
