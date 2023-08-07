import React from "react";

const validation = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido!",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter no minimo 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  },
};

const useForm = (typeValidate?: string) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  function validate(value: string) {
    if (typeValidate === "") return true;
    if (value.length === 0) {
      setError("Preencha um valor!");
      return false;
    } else if (
      typeValidate === "email" &&
      !validation["email"].regex.test(value)
    ) {
      setError(validation.email.message);
      return false;
    } else if (
      typeValidate === "password" &&
      !validation["password"].regex.test(value)
    ) {
      setError(validation.password.message);
      return false;
    } else {
      setError("");
      return true;
    }
  }
  function onChange({ target }: React.ChangeEvent<HTMLInputElement>): void;
  function onChange({ target }: React.ChangeEvent<HTMLTextAreaElement>): void;
  function onChange({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    console.log(target.value);
    if (error) validate(target.value);
    setValue(target.value);
  }

  function onSelect(e: React.PointerEvent<HTMLElement>) {
    if (e.currentTarget.textContent) {
      if (error) validate(e.currentTarget.textContent);
      setValue(e.currentTarget.textContent);
    }
  }

  return {
    value,
    setValue,
    onChange,
    error,
    onSelect,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;