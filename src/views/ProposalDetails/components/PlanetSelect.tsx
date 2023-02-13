import { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";

import arrowDownIcon from "../../../assets/icons/arrowDown.svg";
import arrowUpIcon from "../../../assets/icons/arrowUp.svg";

interface IPlanetSelectProps {
  listPlanet: Array<string>;
  selectedPlanet: string;
  setSelectedPlanet: (value: string) => void;
  desktop: boolean;
}

function PlanetSelect(props: IPlanetSelectProps) {
  const { desktop, listPlanet, selectedPlanet, setSelectedPlanet } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Select
        value={selectedPlanet}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
        onChange={(event) => {setSelectedPlanet(event.target.value)}}
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={() => (
          <Box
            component="img"
            src={menuOpen ? arrowUpIcon : arrowDownIcon}
            sx={{ mr: 2 }}
            alt=""
          />
        )}
        sx={{
          width: "100%",
          border: "1px solid white",
          borderRadius: "20px",
          color: "white",
          height: "45px",
          backgroundColor: "rgba(121, 121, 121, 0.3)",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: "rgba(25, 25, 25, 0.8)",
              color: "white",
              "& .MuiMenuItem-root": {
                padding: 2,
              },
            },
          },
        }}
      >
        <MenuItem value="None">None</MenuItem>
        {
          listPlanet && listPlanet.map((value, index) => (
            <MenuItem value={value} key={index}>{ value }</MenuItem>
          ))
        }
      </Select>
    </>
  );
}

export default PlanetSelect;
