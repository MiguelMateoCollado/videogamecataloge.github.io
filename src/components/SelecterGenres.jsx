import { Select, Option } from "@material-tailwind/react";
import useSelectGenres from "../hooks/useSelectGenres";
const SelecterGenres = () => {
  const { handleSelect, genres } = useSelectGenres();

  return (
    <div className="md:w-3/4 w-full z-auto">
      <Select onChange={handleSelect} label="Select Version" className="">
        {genres.genres.map((genre) => {
          return (
            <Option key={genre.id} value={genre.slug}>
              {genre.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelecterGenres;
