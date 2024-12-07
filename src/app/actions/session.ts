import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "../lib/definitions";
import { SessionModel } from "../lib/schema";
import mongoose from "mongoose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session: ", error);
    return null;
  }
}

export async function createSession(id: mongoose.Types.ObjectId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // create a session in the db
  await SessionModel.create({
    userId: id,
    expiresAt,
  });

  //   const sessionId = data.userId;

  //   Encrypt the session ID
  const session = await encrypt({ userId: id, expiresAt });

  //   store the session in cookies for optimistic auth checks
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
