import { getUser } from "@/app/lib/dal";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const user = await getUser();
  console.log(user);
  return (
    <header className="h-[70px]">
      <nav
        className=" container h-full flex justify-between items-center
      "
      >
        <Link href="/">auth practice</Link>
        <div>
          {user?.name ? (
            <button className="border border-black font-bold py-2 px-4 rounded-3xl hover:bg-black hover:text-white">
              logout
            </button>
          ) : (
            <Link
              href="/login"
              className="border border-black font-bold py-2 px-4 rounded-3xl hover:bg-black hover:text-white"
            >
              login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
