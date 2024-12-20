"use client";

import { useActionState } from "react";
import { sendPasswordResetEmail } from "../actions/auth";
import Link from "next/link";
import { ForgotPasswordActionResponse } from "../lib/definitions";

const initialState: ForgotPasswordActionResponse = {
  success: false,
  message: "",
};
export default function Page() {
  const [state, action, pending] = useActionState(
    sendPasswordResetEmail,
    initialState
  );

  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-6">
      <h1 className="font-bold text-xl">Reset your password</h1>
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
            defaultValue={state.inputs?.email}
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
