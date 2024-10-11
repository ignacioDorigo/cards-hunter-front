import * as Yup from "yup";

export function initialValues() {
  return { original: "", nueva1: "", nueva2: "" };
}

export function validationSchema() {
  return Yup.object({
    original: Yup.string().required("La contraseña original es obligatoria"),
    nueva1: Yup.string().required("La contraseña nueva es obligatoria"),
    nueva2: Yup.string()
      .oneOf([Yup.ref("nueva1"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de la nueva contraseña es obligatoria"),
  });
}