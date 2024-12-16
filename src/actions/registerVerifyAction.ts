import { z } from "zod";
import { SubmitResponse } from "../hooks/useFormSubmit";
import { __endpoints, __validators, ClientRequest } from "../utils";

const schema = z.object({
  email: __validators.email,
  otp: __validators.otp6,
});
type FormDataType = z.infer<typeof schema>;

export async function registerVerifyAction(
  data: FormDataType
): Promise<SubmitResponse> {
  const validate = schema.safeParse(data);
  if (!validate.success)
    return {
      error: "Fix errors and submit",
      fieldErrors: validate.error.flatten().fieldErrors,
    };

  const [res, error] = await ClientRequest.post(
    __endpoints.auth.registerVerify,
    data
  );
  if (error) return { error: "Something went wrong" };

  if (res.status === 200)
    return {
      success: res.message ?? res.data ?? "email verification successful",
      data: {
        ...res.data,
      },
    };

  return { error: res.data ?? res.message ?? "Something went wrong" };
}
