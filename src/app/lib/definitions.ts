import mongoose from "mongoose";
import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long. " })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Password can not be empty" }).trim(),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
});

export const ResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),

  token: z.string().trim(),
});

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export type SignupActionResponse = {
  success: boolean;
  message: string;
  inputs?: SignupFormData;
  errors?: {
    [K in keyof SignupFormData]?: string[];
  };
};

export type SessionPayload = {
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginActionResponse = {
  success: boolean;
  message: string;
  inputs?: LoginFormData;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
};

export type PassWordResetState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export interface ForgotPasswordFormData {
  email: string;
}

export type ForgotPasswordActionResponse = {
  success: boolean;
  message: string;
  inputs?: ForgotPasswordFormData;
  errors?: {
    [K in keyof ForgotPasswordFormData]?: string[];
  };
};
export interface ResetPasswordFormData {
  password: string;
  token: string;
}
export type ResetPasswordActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ResetPasswordFormData]?: string[];
  };
};
