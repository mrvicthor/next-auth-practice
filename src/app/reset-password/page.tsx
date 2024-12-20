"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ResetPassWordForm from "./form";

export default function Page() {
  const seachParams = useSearchParams();
  const code = seachParams.get("code");
  const exp = Number(seachParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;
  console.log({ exp, now });
  return (
    <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
      {!linkIsValid ? (
        <div className="space-y-4">
          <article className="border border-red-500 px-4 py-4 rounded-lg">
            <h1 className="text-red-500 font-lg">Invalid link</h1>
            <p className="text-red-500">
              The link is either invalid or expired
            </p>
          </article>
          <div>
            <Link
              href="/forgot-password"
              className=" bg-black text-white py-2 rounded-lg px-4"
            >
              Request a new password reset link
            </Link>
          </div>
        </div>
      ) : (
        <ResetPassWordForm code={code} />
      )}
    </section>
  );
}
