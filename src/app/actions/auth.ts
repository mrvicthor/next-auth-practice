"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  SignupFormSchema,
  LoginFormState,
  LoginFormSchema,
  PassWordResetState,
  ResetPasswordFormSchema,
  ResetPasswordFormData,
  ForgotPasswordFormSchema,
  ResetPasswordActionResponse,
  SignupActionResponse,
  SignupFormData,
} from "../lib/definitions";
import { SessionModel, UserModel, VerificationTokenModel } from "../lib/schema";
import {
  handlePasswordResetEmail,
  sendVerificationEmail,
} from "../config/sendMail";
import { createSession, deleteSession } from "./session";
import connectToDatabase from "../mongo/db";

const APP_ORIGIN = "http://localhost:3000";
export async function signup(
  state: SignupActionResponse | null,
  formData: FormData
) {
  // connect db
  await connectToDatabase();

  const rawData: SignupFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse(rawData);

  //   If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const { email, password, name } = validatedFields.data;
  //   check if user exist
  const existingUser = await UserModel.exists({ email });

  if (existingUser) {
    return {
      success: false,
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
  // redirect("/");
  return {
    success: true,
    message: "Signup successful. Check email for verification",
  };
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

export async function login(state: LoginFormState, formData: FormData) {
  await connectToDatabase();

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return {
      message: "Invalid credentials",
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return {
      message: "Invalid credentials",
    };
  }

  await createSession(user._id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
}

export async function sendPasswordResetEmail(
  state: PassWordResetState,
  formData: FormData
) {
  // connect to DB
  await connectToDatabase();

  // validate field
  const validatedField = ForgotPasswordFormSchema.safeParse({
    email: formData.get("email"),
  });

  //   If email is invalid, return early
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedField.data;

  // check if user exist
  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      message: "User not found",
    };
  }

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const count = await VerificationTokenModel.countDocuments({
    userId: user._id,
    type: "reset_password",
    expiresAt: { $gt: fiveMinutesAgo },
  });

  console.log(count, "count");

  // if (count <= 1) {
  //   return {
  //     message: "Too many reset requests, please try again later",
  //   };
  // }

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const verificationToken = await VerificationTokenModel.create({
    userId: user._id,
    type: "reset_password",
    expiresAt,
  });

  const url = `${APP_ORIGIN}/reset-password?code=${
    verificationToken._id
  }&exp=${expiresAt.getTime()}`;

  await handlePasswordResetEmail(user.email, url);

  return {
    message: "Password reset link sent to your email",
  };
}

export async function resetPassword(
  state: ResetPasswordActionResponse | null,
  formData: FormData
): Promise<ResetPasswordActionResponse> {
  await connectToDatabase();

  const rawData: ResetPasswordFormData = {
    password: formData.get("password") as string,
    token: formData.get("token") as string,
  };

  const validatedFields = ResetPasswordFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { password, token } = validatedFields.data;

  const validCode = await VerificationTokenModel.findOne({
    _id: token,
    type: "reset_password",
    expiresAt: { $gt: new Date() },
  });

  if (!validCode) {
    return {
      success: false,
      message: "Invalid token or token expired",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await UserModel.findOneAndUpdate(validCode.userId, {
    password: hashedPassword,
  });

  await validCode.deleteOne();

  await SessionModel.deleteMany({
    userId: updatedUser._id,
  });

  return {
    success: true,
    message: "Password reset successful",
  };
}
