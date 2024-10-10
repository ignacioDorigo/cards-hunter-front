import * as Yup from "yup";

export function initialValues() {
  return {
    surname: "",
  };
}

export function initialValues() {
  return Yup.object({
    surname: Yup.string().required("El Apellido es obligatorio"),
  });
}
