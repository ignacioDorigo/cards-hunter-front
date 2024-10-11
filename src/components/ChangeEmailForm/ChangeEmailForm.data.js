import * as Yup from "yup";

export function initialValues() {
  return { email: "" };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Debe tener formato email")
      .required("El email es obligatorio"),
  });
}
