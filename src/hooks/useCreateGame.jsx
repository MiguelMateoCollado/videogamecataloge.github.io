import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFormError from "./useFormError";

const useCreateGame = () => {
  const { validateForm, handleInputChangeError, formErrors } = useFormError();
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState();
  const [genres, setGenres] = useState();
  const [form, setForm] = useState({
    platforms: [],
    genres: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleInputChangeError(event);
    setForm({ ...form, [name]: value });
  };
  const handleCheckBox = (event, type) => {
    const { value } = event.target;
    setForm({
      ...form,
      [type]: form[type].includes(value)
        ? form[type].filter((el) => el !== value)
        : [...form[type], value],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = validateForm();
    console.log(hasErrors);
    if (hasErrors == false) {
      // Envía el formulario
      axios
        .post("http://localhost:3001/create", form)
        .then(() => navigate("/"));
    }
    // Aquí puedes realizar acciones con los datos, como enviarlos a un servidor o mostrarlos en una alerta.
  };

  useEffect(() => {
    const fetchDataPlat = async () => {
      const response = await fetch(`http://localhost:3001/platforms`);
      const data = await response.json();
      setPlatforms(data);
    };
    fetchDataPlat();
    const fetchDataGen = async () => {
      const response = await fetch(`http://localhost:3001/generos`);
      const data = await response.json();
      setGenres(data);
    };
    fetchDataGen();
  }, []);
  return {
    handleSubmit,
    handleCheckBox,
    handleInputChange,
    platforms,
    genres,
    formErrors,
    form,
  };
};

export default useCreateGame;
