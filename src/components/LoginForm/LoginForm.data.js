import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Debe ingresar el formato correcto")
      .required("El mail es obligatiorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });
}
