import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const useFormError = () => {
  const formError = useRef({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  console.log(formError.current);

  useEffect(() => {
    formError.current = { ...formError.current };
    console.log(formError.current);
  }, formError);
  const handleInputChangeError = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formError.current = {
      ...formError.current,
      [name]: validateCheckBox(name, formulario),
    };
  };

  const handleCheckboxError = (name, formulario) => {
    formError.current = {
      ...formError.current,
      [name]: validateCheckBox(name, formulario),
    };
  };

  const validateCheckBox = (name, value) => {
    if (name === "platforms" && value.platforms.length === 1) {
      return "Debes Seleccionar al menos 1";
    } else {
      return undefined;
    }
  };

  const validateField = (name, value) => {
    let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (value === undefined) {
      return undefined;
    }
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

    for (const fieldName in formError.current) {
      const value = formError.current[fieldName];
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
    formError,
    handleCheckboxError,
    buttonDisabled,
    setButtonDisabled,
  };
};

export default useFormError;
