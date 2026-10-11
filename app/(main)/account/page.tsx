import type { Metadata } from "next";
import { logout } from "@/app/(auth)/actions";
import TextField from "@/components/ui/TextField";
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
          Votre session a expiré. Veuillez vous reconnecter.
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
      <h1 id="account-title" className="text-h5 font-medium text-grey-950">
        Mon compte
      </h1>
      <p className="mt-2 text-body-m text-grey-600">{user.name}</p>

      <form noValidate className="mt-10 flex flex-col gap-8">
        <TextField
          id="lastName"
          label="Nom"
          type="text"
          autoComplete="family-name"
          defaultValue={lastName}
        />
        <TextField
          id="firstName"
          label="Prénom"
          type="text"
          autoComplete="given-name"
          defaultValue={firstName}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={user.email}
        />
        <TextField id="password" label="Mot de passe" type="password" autoComplete="new-password" />

        <button
          type="button"
          className="mt-2 h-[50px] self-start rounded-[10px] bg-grey-800 px-7 text-body-m text-white transition-colors hover:bg-grey-950"
        >
          Modifier les informations
        </button>
      </form>
    </section>
  );
}
