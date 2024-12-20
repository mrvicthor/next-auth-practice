"use client";

import { useActionState, useState } from "react";
import { sendPasswordResetEmail } from "../actions/auth";

export default function Page() {
  const [state, action, pending] = useActionState(
    sendPasswordResetEmail,
    undefined
  );
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-6">
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
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
