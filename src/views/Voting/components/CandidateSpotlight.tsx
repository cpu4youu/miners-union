import { useState } from "react";
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

function CandidateSpotlight() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue) };
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
         {/*  <Tab
            label="Naron"
            style={{
              color: "white",
              opacity: "0.7",
              fontSize: desktop ? "24px" : "20px",
              fontFamily: "Oxanium Medium",
              textTransform: "none",
            }}
          /> */}
          <Tab
            label="Eyeke"
            style={{
              color: "white",
              opacity: "0.7",
              fontSize: desktop ? "24px" : "20px",
              fontFamily: "Oxanium Medium",
              textTransform: "none",
            }}
          />
         {/*  <Tab
            label="Kavian"
            style={{
              color: "white",
              opacity: "0.7",
              fontSize: desktop ? "24px" : "20px",
              fontFamily: "Oxanium Medium",
              textTransform: "none",
            }}
          /> */}
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        profileIcon={CandidateOneIcon}
        mobile={mobile}
      />
     {/*  <TabPanel
        value={value}
        index={1}
        profileIcon={CandidateOneIcon}
        mobile={mobile}
      />
      <TabPanel
        value={value}
        index={2}
        profileIcon={CandidateOneIcon}
        mobile={mobile}
      /> */}
    </Box>
  );
}

export default CandidateSpotlight;
