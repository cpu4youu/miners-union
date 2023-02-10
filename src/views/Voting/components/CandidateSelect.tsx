import { useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";

import arrowDownIcon from "../../../assets/icons/arrowDown.svg";
import arrowUpIcon from "../../../assets/icons/arrowUp.svg";

interface ICandidateSelectProps {
  listCandidate: Array<string>;
  selectedCandidate: string;
  setSelectedCandidate: (value: string) => void;
  desktop: boolean;
}

function CandidateSelect(props: ICandidateSelectProps) {
  const { desktop, listCandidate, selectedCandidate, setSelectedCandidate } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Select
        value={selectedCandidate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
        onChange={(event) => {setSelectedCandidate(event.target.value)}}
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
          width: desktop ? "220px" : "160px",
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
          listCandidate && listCandidate.map((value, index) => (
            <MenuItem value={value} key={index}>{ value }</MenuItem>
          ))
        }
      </Select>
    </>
  );
}

export default CandidateSelect;
