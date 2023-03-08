import { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import TabPanel from "./TabPanel";

import CandidateOneIcon from "../../../assets/imgs/candidateone.png";
import { WalletContext } from "../../../App";
import { planets } from "../../../config";

function CandidateSpotlight() {
  const  { planet, setPlanet } = useContext(WalletContext) 
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { 
    console.log(planets[newValue])
    setPlanet(planets[newValue])
    setValue(newValue) 
  };
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  return (
    <Box style={{ marginTop: desktop ? "0" : "20px" }}>
      <Box>
      <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {planets.map((planet) => (
             <Tab
             label={planet}
             style={{
               color: "white",
               opacity: "0.7",
               fontSize: desktop ? "24px" : "20px",
               fontFamily: "Oxanium Medium",
               textTransform: "capitalize",
             }}
           />
          ))}
        </Tabs>
      </Box>
      {planets.map((plant, key) => (
        <TabPanel
        value={value}
        index={key}
        profileIcon={CandidateOneIcon}
        mobile={mobile}
        />
      ))}
    </Box>
  );
}

export default CandidateSpotlight;
