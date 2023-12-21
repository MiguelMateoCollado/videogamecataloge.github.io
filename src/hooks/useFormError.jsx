import { useState } from "react";
import { useEffect } from "react";
const useFormError = () => {
  const [formErrors, setFormErrors] = useState({});
  /*
  useEffect(() => {
    setFormErrors({ ...formErrors, ["tuvieja"]: -1 });
  }, []); 

  */
  /*
 
  useEffect(() => {
    console.log(formErrors);
    // console.log(Object.keys(formErrors));
  }, [formErrors]);*/

  const handleInputChangeError = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    switch (name) {
      case "name":
        // Validar que el nombre tenga al menos 3 caracteres
        return value.length < 3
          ? "El nombre debe tener al menos 3 caracteres."
          : undefined;
      case "description":
        // Validar el formato del correo electrónico usando una expresión regular simple
        return value.length > 50 ? undefined : "Ingrese una description larga.";

      case "background_image":
        // Validar que la contraseña tenga al menos 6 caracteres
        return urlRegex.test(value) ? undefined : "La url no es valida";

      case "website":
        // Validar que la contraseña tenga al menos 6 caracteres
        return urlRegex.test(value) ? undefined : "La url no es valida";

      case "rating":
        // Validar que la contraseña tenga al menos 6 caracteres
        return value > 0 ? undefined : "Debe ser mayor a 0";
      default:
        // No hay validación específica para este campo
        return undefined;
    }
  };

  const validateForm = () => {
    const errors = {};
    // Realizar la validación para cada campo en el formulario
    for (const fieldName in formErrors) {
      const value = formErrors[fieldName];
      const fieldError = validateField(fieldName, value);
      if (fieldError) {
        errors[fieldName] = fieldError;
      }
    }
    // Retorna true si hay errores, o false si no los hay
    return Object.keys(errors).length > 0;
  };

  return {
    validateForm,
    validateField,
    handleInputChangeError,
    formErrors,
    setFormErrors,
  };
};

export default useFormError;
