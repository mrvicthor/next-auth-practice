"use client";
import { useActionState } from "react";
import { resetPassword } from "../actions/auth";
import { ResetPasswordActionResponse } from "../lib/definitions";

type Props = {
  code: string;
};

const initialState: ResetPasswordActionResponse = {
  success: false,
  message: "",
};
const ResetPassWordForm = ({ code }: Props) => {
  const [state, action, pending] = useActionState(resetPassword, initialState);

  return (
    <>
      <form action={action} className="flex flex-col gap-4 w-[30rem]">
        <h1 className="text-center text-xl font-bold">Reset Password</h1>
        <div>
          <label htmlFor="password" className="mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
            className="w-full border py-2 rounded-lg px-4"
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
        <input className="hidden" name="token" value={code} />

        {state.message && (
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
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ResetPassWordForm;
