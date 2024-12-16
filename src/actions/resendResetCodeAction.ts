import { __endpoints, ClientRequest } from "../utils";

export async function resendResetCodeAction(email: string): Promise<boolean> {
  const [res, error] = await ClientRequest.post(
    __endpoints.auth.resendResetCode,
    { email }
  );
  if (error) return false;

  if (res.status === 200) return true;

  return false;
}
