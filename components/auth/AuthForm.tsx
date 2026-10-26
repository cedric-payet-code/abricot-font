import Link from "next/link";

type AuthFormProps = {
  title: string;
  action: (formData: FormData) => void;
  pending: boolean;
  error?: string;
  submitLabel: string;
  pendingLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
};

export default function AuthForm({
  title,
  action,
  pending,
  error,
  submitLabel,
  pendingLabel,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children,
}: AuthFormProps) {
  return (
    <>
      <div className="my-auto flex flex-col gap-8 py-8">
        <h1 className="text-center text-h1 font-medium text-brand-text">{title}</h1>

        <form action={action} noValidate className="flex flex-col gap-6">
          {children}

          {error && (
            <p
              role="alert"
              className="rounded bg-error-light px-4 py-3 text-body-s text-error-text"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-[50px] self-center rounded-[10px] bg-grey-800 px-18 text-body-m text-white transition-colors hover:bg-grey-950 disabled:cursor-not-allowed disabled:bg-grey-200 disabled:text-grey-400"
          >
            {pending ? pendingLabel : submitLabel}
          </button>
        </form>
      </div>

      <p className="self-center whitespace-nowrap text-body-s text-grey-950">
        {footerText}{" "}
        <Link
          href={footerLinkHref}
          className="ml-2.5 text-brand-text underline underline-offset-2 hover:text-grey-950"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </>
  );
}
