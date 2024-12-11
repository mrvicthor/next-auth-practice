import Link from "next/link";
import LoginForm from "./form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500">Enter your information below</p>
      </div>
      <LoginForm />
      <div className="mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
