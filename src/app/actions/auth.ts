"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignupFormSchema, FormState } from "../lib/definitions";
import { UserModel, VerificationTokenModel } from "../lib/schema";
import { sendVerificationEmail } from "../config/sendMail";
import { createSession } from "./session";
import connectToDatabase from "../mongo/db";

const APP_ORIGIN = "http://localhost:3000";
export async function signup(state: FormState, formData: FormData) {
  // connect db
  await connectToDatabase();
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //   If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;
  //   Call db to create a user
  const existingUser = await UserModel.exists({ email });

  if (existingUser) {
    return {
      message: "User already exist.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const userId = user._id;
  const verificationToken = await VerificationTokenModel.create({
    userId,
    type: "email_verification",
    expiresAt: Date.now(),
  });

  const url = `${APP_ORIGIN}/email-verify/${verificationToken._id}`;

  //   send verification email
  await sendVerificationEmail(user.email, url);
  await createSession(userId);
  redirect("/");
}

export async function verifyEmail(code: string) {
  const validCode = await VerificationTokenModel.findOne({
    _id: code,
  });

  if (!validCode) {
    return {
      message: "Invalid or expired verification code",
    };
  }

  const user = await UserModel.findByIdAndUpdate(
    validCode.userId,
    {
      isVerified: true,
    },
    { new: true }
  );
  await validCode.deleteOne();

  return { user };
}

export async function login(state: FormState, formData: FormData) {}
