import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyEmail } from "@/app/actions/auth";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const { user } = await verifyEmail(id);
  return (
    <section className="flex flex-col items-center mt-20">
      <div className="w-[30rem] flex flex-col gap-4">
        <Alert variant={user ? "success" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{user ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>
            {user ? "Email verified." : "Invalid link or code may have expired"}
          </AlertDescription>
        </Alert>
        <Link href="/" className="text-center">
          Go back to home
        </Link>
      </div>
    </section>
  );
}
