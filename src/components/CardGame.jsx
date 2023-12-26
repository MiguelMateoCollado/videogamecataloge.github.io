import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function CardGame({ img, name, slug, genres, seeDB }) {
  
  return (
    <Card className="mt-6 md:w-2/5 lg:w-2/6 xl:w-3/12 2xl:w-2/12 w-full z-0 drop-shadow-lg shadow-red-900 rounded-none border-4 border-gray-900 h-96  filter-none">
      <CardHeader
        color="blue-gray"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url("${img}")`,
        }}
        className="relative  shadow-inner rounded-none border-4 border-gray-900 h-3/4"
      >
        <p className="invisible">1</p>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 gap-4 flex-wrap text-red-900 justify-center flex text-sm"
        >
          {genres.map((genre) => {
            return (
              <span className="text-md" key={genre.id}>
                {genre.name}
              </span>
            );
          })}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={seeDB !== undefined ? `/game/id/${seeDB}` : `/game/${slug}`}>
          <Button className="bg-red-600 border-2 border-black hover:shadow-inner hover:shadow-[#5C0500]/90 shadow-red-900 rounded-none hover: shadow-inner">
            More Details...
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
