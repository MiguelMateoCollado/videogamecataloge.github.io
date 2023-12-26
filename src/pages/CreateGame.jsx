import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import CheckBoxList from "../components/CheckBoxList";
import useCreateGame from "../hooks/useCreateGame";
const CreateGame = () => {
  const { platforms, genres, register, handleSubmit, onSubmit, errors } =
    useCreateGame();
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
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-auto max-w-screen-lg mx-auto sm:w-auto"
        >
          <div className="mb-4 flex flex-wrap gap-6">
            <div className="flex w-full gap-3">
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/4"
                  label="Name"
                  name="name"
                  {...register("name", {
                    required: true,
                    minLength: 3,
                  })}
                />
                {errors.name?.type === "minLength" && (
                  <p className="text-red-900 font-bold">
                    Debe tener mas de 3 digitos
                  </p>
                )}
              </div>
              <div className="flex flex-wrap w-full">
                <Textarea
                  className="w-1/2"
                  label="Description"
                  name="description"
                  {...register("description", {
                    required: true,
                    minLength: 50,
                  })}
                />
                {errors.description?.type === "minLength" && (
                  <p className="text-red-900 font-bold">Debe ser mas larga!</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-3">
              <Input
                className="w-1/2"
                label="image url"
                name="background_image"
                {...register("background_image", {
                  required: true,
                  pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                })}
              />
              {errors.background_image?.type === "pattern" && (
                <p className="text-red-900 font-bold">Ingresa una url valida</p>
              )}
            </div>
            <div className="flex w-full gap-3">
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/2"
                  label="rating"
                  name="rating"
                  {...register("rating")}
                  {...register("rating", {
                    required: true,
                    min: 1,
                  })}
                />
                {errors.rating?.type === "min" && (
                  <p className="text-red-900 font-bold">Debe ser mayor a 0!</p>
                )}
              </div>
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/2"
                  label="web url"
                  name="website"
                  {...register("website", {
                    required: true,
                    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                  })}
                />
                {errors.website?.type === "pattern" && (
                  <p className="text-red-900 font-bold">
                    Ingresa una url valida
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-wrap w-full gap-3 divide-y my-2 border-black border-t p-3">
              <h3 className="w-full">Select Platforms</h3>
              <CheckBoxList
                items={platforms}
                registrar={register}
              />
            </div>
            <div className="flex justify-center flex-wrap w-full gap-3 divide-y my-2 border-black border-t p-3">
              <h3 className="w-full">Select Genres</h3>

              <CheckBoxList items={genres} type={"genres"} />
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
