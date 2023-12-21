import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import CheckBoxList from "../components/CheckBoxList";
import useCreateGame from "../hooks/useCreateGame";
import useFormError from "../hooks/useFormError";
const CreateGame = () => {
  const {
    handleSubmit,
    handleInputChange,
    handleCheckBox,
    platforms,
    genres,
    formErrors,
  } = useCreateGame();
  console.log(formErrors);
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
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/4"
                  label="Name"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                />
                {formErrors?.name && (
                  <p className="text-red-700 w-full text-start font-bold">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap w-full">
                <Textarea
                  className="w-1/2"
                  label="Description"
                  name="description"
                  onChange={(e) => handleInputChange(e)}
                />
                {formErrors?.description && (
                  <p className="text-red-700 w-full text-start font-bold">
                    {formErrors.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-3">
              <Input
                className="w-1/2"
                label="image url"
                name="background_image"
                onChange={(e) => handleInputChange(e)}
              />
              {formErrors?.background_image && (
                <p className="text-red-700 w-full text-start font-bold">
                  {formErrors.background_image}
                </p>
              )}
            </div>
            <div className="flex w-full gap-3">
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/2"
                  label="rating"
                  name="rating"
                  onChange={(e) => handleInputChange(e)}
                />
                {formErrors?.rating && (
                  <p className="text-red-700 w-full text-start font-bold">
                    {formErrors.rating}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap w-full">
                <Input
                  className="w-1/2"
                  label="web url"
                  name="website"
                  onChange={(e) => handleInputChange(e)}
                />
                {formErrors?.website && (
                  <p className="text-red-700 w-full text-start font-bold">
                    {formErrors.website}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-wrap w-full gap-3 divide-y my-2 border-black border-t p-3">
              <h3 className="w-full">Select Platforms</h3>
              <CheckBoxList
                items={platforms}
                set={handleCheckBox}
                type={"platforms"}
              />
              {formErrors?.platforms && (
                <p className="text-red-700 w-full text-start font-bold">
                  {formErrors.platforms}
                </p>
              )}
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
