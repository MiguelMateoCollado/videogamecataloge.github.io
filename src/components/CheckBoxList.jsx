import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
const CheckBoxList = ({ items, set, type }) => {
  return (
    <Card className="w-full flex">
      <List className="flex">
        <ListItem className="p-0 flex flex-wrap w-full">
          {items?.map((item) => {
            return (
              <label
                key={item.id}
                htmlFor={item.name}
                className="flex  cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <ListItem>
                    <Checkbox
                      ripple={false}
                      className="hover:before:opacity-0"
                      name={item.name}
                      value={item.name}
                      onChange={(e) => set(e, type)}
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItem>
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  {item.name}
                </Typography>
              </label>
            );
          })}
        </ListItem>
      </List>
    </Card>
  );
};

export default CheckBoxList;
