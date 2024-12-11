import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await logout();
        redirect("/login");
      }}
    >
      <button
        type="submit"
        className="border border-black font-bold py-2 px-4 rounded-3xl hover:bg-black hover:text-white"
      >
        logout
      </button>
    </form>
  );
};

export default LogoutButton;
