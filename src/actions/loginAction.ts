import { z } from "zod";
import { SubmitResponse } from "../hooks/useFormSubmit";
// @ts-expect-error js file
import { loginSchema } from "../validations/signupSchema";
import { __endpoints, ClientRequest } from "../utils";

const schema = loginSchema;
type LoginFormData = z.infer<typeof schema>;

export async function loginAction(
  data: LoginFormData
): Promise<SubmitResponse> {
  const validate = schema.safeParse(data);
  if (!validate.success)
    return {
      error: "Fix errors and submit",
      fieldErrors: validate.error.flatten().fieldErrors,
    };

  const [res, error] = await ClientRequest.post(__endpoints.auth.login, data);
  if (error) return { error: "Something went wrong" };

  if (res.status === 200) return { success: "logging in...", data: res.data };

  return { error: res.data ?? "Something went wrong" };
}
