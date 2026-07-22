import { ScouterDashboard } from "./components/scouter-dashboard";
import { hasOwnerSession } from "./lib/owner-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!(await hasOwnerSession())) redirect("/login");
  return <ScouterDashboard />;
}
