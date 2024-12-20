import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  return (
    <section className="container">
      <div className="flex justify-between items-center py-4">
        <h1>my Dashboard</h1>
        <LogoutButton />
      </div>
    </section>
  );
}
