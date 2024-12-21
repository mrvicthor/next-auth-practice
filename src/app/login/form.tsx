"use client";
import { useActionState } from "react";
import { login } from "../actions/auth";
import Link from "next/link";
import { LoginActionResponse } from "../lib/definitions";

const initialState: LoginActionResponse = {
  success: false,
  message: "",
};

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className=" flex flex-col gap-4 w-[30rem]">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          defaultValue={state.inputs?.email}
          className="w-full border py-2 rounded-lg px-4"
          placeholder="yourname@domain.com"
          required
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
          defaultValue={state.inputs?.password}
          className="w-full border py-2 rounded-lg px-4"
          placeholder="your password"
          required
        />
      </div>

      {state?.errors?.password && <p>{state.errors.password}</p>}
      <div className="flex justify-end">
        <Link href="/forgot-password" className="capitalize">
          forgot password?
        </Link>
      </div>
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
        {pending ? "Submitting..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
