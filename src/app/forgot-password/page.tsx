"use client";

import { useActionState, useState } from "react";
import { sendPasswordResetEmail } from "../actions/auth";
import Link from "next/link";

export default function Page() {
  const [state, action, pending] = useActionState(
    sendPasswordResetEmail,
    undefined
  );
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-6">
      <h1 className="font-bold text-xl">Reset your password</h1>
      <form
        action={action}
        className=" flex flex-col gap-4 w-[30rem]"
        autoComplete="on"
      >
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
            required
          />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white py-2 rounded-lg"
        >
          {" "}
          {pending ? "Submitting..." : "Reset Password"}
        </button>

        <p>
          Go back to{" "}
          <Link href="/login" className="text-blue-400">
            Login
          </Link>{" "}
          or{" "}
          <Link href="/signup" className="text-blue-400">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
