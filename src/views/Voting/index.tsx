import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";

import MagorView from "./components/MagorView";
import CandidateSpotlight from "./components/CandidateSpotlight";
import VotePanel from "./components/VotePanel";
import CandidatePanel from "./components/CandidatePanel";
import { WalletContext } from "../../App";
import { useContext} from "react";


const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function Voting() {
  const {wallet, setWallet, loggedIn, setLoggedIn} = useContext(WalletContext)
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
          <MagorView />
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
