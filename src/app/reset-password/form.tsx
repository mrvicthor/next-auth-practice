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
      <form action={action}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter new password"
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
          <div>
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
    </>
  );
};

export default ResetPassWordForm;
