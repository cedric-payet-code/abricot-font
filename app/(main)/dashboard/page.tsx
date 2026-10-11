import { getCurrentUser } from "@/lib/user";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <h1 className="text-h4">Tableau de bord</h1>
      {user && (
        <p className="mt-2 text-body-l text-grey-950">
          Bonjour {user.name}, voici un aperçu de vos projets et tâches
        </p>
      )}
    </>
  );
}
