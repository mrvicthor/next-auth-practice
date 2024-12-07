"use client";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { verifyEmail } from "@/app/actions/auth";
import Link from "next/link";

type Props = {
  id: string;
};
const VerifyEmail = ({ id }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleVerification = async () => await verifyEmail(id);
    handleVerification();
    setIsSuccess(true);
  });
  return (
    <section className="flex flex-col items-center mt-20">
      <div className="w-[30rem] flex flex-col gap-4">
        <Alert variant={isSuccess ? "success" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>
            {isSuccess ? "Email verified." : "Invalid link"}
          </AlertDescription>
        </Alert>
        <Link href="/" className="text-center">
          Go back to home
        </Link>
      </div>
    </section>
  );
};

export default VerifyEmail;
