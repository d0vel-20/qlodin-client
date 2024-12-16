import { z } from "zod";
import { SubmitResponse } from "../hooks/useFormSubmit";
import {
  __endpoints,
  __validators,
  AuthRequest,
  ClientRequest,
} from "../utils";

const schema = z.object({
  firstName: __validators.properName,
  lastName: __validators.properName,
  userName: __validators.userName,
  mobileNumber: __validators.phone,
  dateOfBirth: __validators.dateOfBirth,
});
type RegisterFormData = z.infer<typeof schema>;

export async function profileSetupAction(
  data: RegisterFormData
): Promise<SubmitResponse> {
  const validate = schema.safeParse(data);
  if (!validate.success)
    return {
      error: "Fix errors and submit",
      fieldErrors: validate.error.flatten().fieldErrors,
    };

  const [res, error] = await AuthRequest.post(
    __endpoints.auth.registerSetupProfile,
    data
  );
  if (error) return { error: "Something went wrong" + error };

  if (res.status === 200)
    return {
      success: res.message ?? res.data ?? "Profile setup successful",
      data: res.data,
    };

  return { error: res.data ?? res.message ?? "Something went wrong" };
}
