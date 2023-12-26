import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCreateGame = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [platforms, setPlatforms] = useState();
  const [genres, setGenres] = useState();
  async function getPlatforms() {
    let data = await axios.get("http://localhost:3001/platforms");
    setPlatforms(await data.data);
  }
  async function getGenres() {
    let data = await axios.get("http://localhost:3001/generos");
    setGenres(await data.data);
  }

  const onSubmit = (data) => console.log(data);
  useEffect(() => {
    getPlatforms();
    getGenres();
  }, []);
  return { register, handleSubmit, platforms, errors, genres, onSubmit };
};

export default useCreateGame;
