import Link from "next/link";
import SignupForm from "./form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>
      <SignupForm />
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
