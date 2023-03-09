import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";

import PlanetView from "./components/PlanetView";
import CandidateSpotlight from "./components/CandidateSpotlight";
import VotePanel from "./components/VotePanel";
import CandidatePanel from "./components/CandidatePanel";
import { useContext } from "react";
import { WalletContext } from "../../App";


const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function Voting() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  return (
    <Box padding={desktop ? "36px 12px" : "24px 0"}>
      <Box
        display="flex"
        justifyContent="center"
        pb={desktop ? "32px" : "20px"}
        borderBottom="1px solid rgba(255, 255, 255, 0.14)"
      >
        <Box
          className={desktop ? classes.contentWrapper : ""}
          display="flex"
          justifyContent="space-between"
          flexDirection={desktop ? "row" : "column"}
        >
          <PlanetView />
          <CandidateSpotlight />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        py={desktop ? "36px" : "24px"}
        borderBottom="1px solid rgba(255, 255, 255, 0.14)"
      >
        <Box className={desktop ? classes.contentWrapper : ""}>
          <VotePanel desktop={desktop} />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        py="24px" 
      >
        <Box
          className={classnames(
            desktop ? classes.contentWrapper : "",
            mobile ? classes.mobileWrapper : ""
          )}
        >
          <CandidatePanel desktop={desktop} />
        </Box>
      </Box>
    </Box>
  );
}

export default Voting;
