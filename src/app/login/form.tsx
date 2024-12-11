"use client";
import { useActionState, useState } from "react";
import { login } from "../actions/auth";

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form action={action} className=" flex flex-col gap-4 w-[30rem]">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border py-2 rounded-lg px-4"
          placeholder="your password"
        />
      </div>

      {state?.errors?.password && <p>{state.errors.password}</p>}
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
