import { FormEvent, useState } from "react";

export type _JSON = Record<string, string>;

export type SubmitResponse = {
  error?: string;
  data?: any;
  success?: string;
  fieldErrors?: { [key: string]: string[] };
};

export type UseFormSubmitParams<T> = {
  onSubmit: (values: T) => Promise<void | SubmitResponse>;
  onSuccess?: (data: SubmitResponse) => void;
  logging?: boolean;
  extra?: Record<string, string>;
};

export function useFormSubmit<T extends _JSON>({
  onSubmit,
  onSuccess,
  logging = true,
  extra,
}: UseFormSubmitParams<T>) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<T>({} as T);
  const [res, setRes] = useState<SubmitResponse>({});

  function log(data: any) {
    if (logging) console.log(data);
  }

  function updateValue(key: string, value: string) {
    setValues({ ...values, [key]: value });
  }

  const inputProps = (key: string) => ({
    onChange: (e: any) => {
      updateValue(key, e.target.value)
    },
    value: values[key] || "",
    error: res.fieldErrors?.[key] && res.fieldErrors?.[key].length > 0 ? res.fieldErrors?.[key][0] : "",
  });

  async function handleSubmit(e?: FormEvent) {
    if(e) e.preventDefault();
    setLoading(true);
    setRes({});
    log({ values });
    if(!onSubmit) return;
    try {
      const _res = await onSubmit({ ...values, ...extra });
      if (_res && _res.success != undefined && onSuccess) onSuccess(_res);
      setRes(_res ?? {});
    } catch (e) {
     if(logging) console.error(e);
      setRes({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  const formButtonProps = {
    loading,
    onPress: handleSubmit,
  };

  return { inputProps, handleSubmit, formButtonProps, res };
}
