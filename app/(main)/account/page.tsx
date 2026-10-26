import type { Metadata } from "next";
import { logout } from "@/app/(auth)/actions";
import AccountForm from "@/components/account/AccountForm";
import { getCurrentUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Mon compte | Abricot",
};

function splitName(name: string) {
  const [firstName = "", ...rest] = name.trim().split(" ");
  return { firstName, lastName: rest.join(" ") };
}

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="alert" className="text-body-m text-error-text">
          Impossible de récupérer vos informations. Réessayez plus tard ou reconnectez-vous.
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="h-[50px] rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950"
          >
            Se reconnecter
          </button>
        </form>
      </div>
    );
  }

  const { firstName, lastName } = splitName(user.name);

  return (
    <section
      aria-labelledby="account-title"
      className="rounded-[10px] border border-grey-200 bg-white px-6 py-10 md:px-[59px] md:pt-12"
    >
      <h1 id="account-title" className="text-h5 font-medium text-grey-800">
        Mon compte
      </h1>
      <p className="mt-2 text-body-m text-grey-600">{user.name}</p>

      <AccountForm firstName={firstName} lastName={lastName} email={user.email} />

      <form action={logout} className="mt-10 border-t border-grey-200 pt-8">
        <button
          type="submit"
          className="h-[50px] rounded-[10px] border border-grey-200 bg-white px-7 text-body-m text-grey-950 transition-colors hover:border-grey-400"
        >
          Se déconnecter
        </button>
      </form>
    </section>
  );
}
