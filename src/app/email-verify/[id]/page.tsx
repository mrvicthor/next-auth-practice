import VerifyEmail from "@/components/VerifyEmail";

export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id;
  return <VerifyEmail id={id} />;
}
