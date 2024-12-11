import { redirect } from "next/navigation";
import "server-only";
import { decrypt } from "../actions/session";
import { cookies } from "next/headers";
import { cache } from "react";
import { UserModel } from "./schema";

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
}

export const getUser = cache(async () => {
  console.log("trigger");
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await UserModel.findById(session.userId);
    const detailsToShow = { name: user.name, email: user.email };
    return detailsToShow;
  } catch (error) {
    console.log("Failed to fetch user: ", error);
    return null;
  }
});
