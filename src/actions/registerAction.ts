import { z } from "zod";
import { SubmitResponse } from "../hooks/useFormSubmit";
// @ts-expect-error js file
import { signupSchema } from "../validations/signupSchema";
import { __endpoints, ClientRequest } from "../utils";

const schema = signupSchema;
type RegisterFormData = z.infer<typeof schema>;

export async function registerAction(
  data: RegisterFormData
): Promise<SubmitResponse> {
  const validate = schema.safeParse(data);
  if (!validate.success)
    return {
      error: "Fix errors and submit",
      fieldErrors: validate.error.flatten().fieldErrors,
    };

  const [res, error] = await ClientRequest.post(__endpoints.auth.register, data);
  if (error) return { error: "Something went wrong" };

  if (res.status === 201)
    return {
      success: res.message ?? res.data ?? "Registration successful",
      data,
    };

  return { error: res.data ?? res.error ?? "Something went wrong" };
}
