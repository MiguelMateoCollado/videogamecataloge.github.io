import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CheckBoxList from "../components/CheckBoxList";
import { useEffect, useState } from "react";
const CreateGame = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState();
  const [genres, setGenres] = useState();
  const [form, setForm] = useState({
    platforms: [],
    genres: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    // Aquí puedes realizar acciones con los datos, como enviarlos a un servidor o mostrarlos en una alerta.
    axios.post("http://localhost:3001/create", form).then(() => navigate("/"));
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

  return (
    <div className="h-screen flex items-center">
      <Card className="bg-white p-5 flex justify-center  drop-shadow-lg shadow-red-900 rounded-none border-4 border-gray-900  filter-none mx-auto max-w-screen-lg ">
        <Typography variant="h4" color="blue-gray">
          Create a new videogame
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details into a new videogame.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-auto max-w-screen-lg mx-auto sm:w-auto"
        >
          <div className="mb-4 flex flex-wrap gap-6">
            <div className="flex w-full gap-3">
              <Input
                className="w-1/4"
                label="Name"
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
              <Textarea
                className="w-1/2"
                label="Description"
                name="description"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex w-full gap-3">
              <Input
                className="w-1/2"
                label="image url"
                name="background_image"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex w-full gap-3">
              <Input
                className="w-1/2"
                label="rating"
                name="rating"
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                className="w-1/2"
                label="web url"
                name="website"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex justify-center flex-wrap w-full gap-3 divide-y my-2 border-black border-t p-3">
              <h3 className="w-full">Select Platforms</h3>
              <CheckBoxList
                items={platforms}
                set={handleCheckBox}
                type={"platforms"}
              />
            </div>
            <div className="flex justify-center flex-wrap w-full gap-3 divide-y my-2 border-black border-t p-3">
              <h3 className="w-full">Select Genres</h3>
              <CheckBoxList
                items={genres}
                set={handleCheckBox}
                type={"genres"}
              />
            </div>
          </div>

          <Button
            className="mt-6 bg-blue-600 border-2 border-black hover:shadow-inner hover:shadow-[#244156]/90 shadow-284b63-900 rounded-none hover: shadow-inner"
            fullWidth
            type="submit"
          >
            CREAR JUEGO
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateGame;
