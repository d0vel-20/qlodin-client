import { SubmitResponse } from "../hooks/useFormSubmit";

export function FormMessage({ error, success }: SubmitResponse) {
  if (error)
    return (
      <p className="rounded bg-red-200 px-4 py-1.5 text-red-950">{error}</p>
    );
  if (success)
    return (
      <p className="rounded bg-green-200 px-4 py-1.5 text-green-950">
        {success}
      </p>
    );
  return <></>;
}
