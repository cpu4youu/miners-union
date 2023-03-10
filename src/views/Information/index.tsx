import { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import velesprofile from "../../assets/imgs/velesprofile.png";
import rocket from "../../assets/imgs/rocket.png";
import BackButtonIcon from "../../assets/icons/backbutton.png";
import PlanetSelect from "./components/PlanetSelect";
import { WalletContext } from "../../App";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
});

function Information() {
  const {wallet} = useContext(WalletContext)
  const [proposer, setProposer] = useState(wallet.name ? wallet.name : "Enter your wallet");
  const [title, setTitle] = useState("Miners Union: Add Voti...");
  const [memo, setMemo] = useState("Adding Vote Power to the Miners Union");
  const [description, setDescription] = useState(
    "Adding Vote Power to the Miners Union"
  );
  const [tlmAmount, setTlmAmount] = useState("10000");
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(603));

  const handleProposerChange = (e: any) => {
    setProposer(e.target.value);
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleTlmAmountChange = (e: any) => {
    setTlmAmount(e.target.value);
  };

  const handleMemoChange = (e: any) => {
    setMemo(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const response = window.confirm("Are you sure you want to submit this?");
    console.log(response);
  }

  return (
    <>
      <Box display="flex" justifyContent={desktop ? "center" : ""} pt="36px">
        <Box className={desktop ? classes.contentWrapper : ""} color="white">
          <Typography
            fontFamily="Oxanium Medium"
            fontSize={desktop ? "24px" : "20px"}
            fontWeight="400"
            lineHeight="25px"
          >
            The Miners Union
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="8px"
            lineHeight="20px"
            color="rgba(255, 255, 255, 0.66)"
          >
            Digging deep for a better tomorrow!
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="24px"
            lineHeight="20px"
          >
            Recently Alien Worlds introduced the Syndicates in Alien Worlds.
            Each week players use their TLM to vote for their planetary
            government. So in Alien Worlds money buys power. This is why we
            currently mostly see whales on the councils and miners have almost
            no chance of getting a seat at the table. We, the Miners Union are
            here to change that.
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="24px"
            lineHeight="20px"
          >
            The Miners Union is asking all planets for support to include the
            miners in the Alien Worlds DAO.
          </Typography>
          
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="24px"
            lineHeight="20px"
          >
            We have compiled all the information about the Miners Union 
            in a gitbook, which can be found <a href="https://info.minersunion.io/" target="_blank">HERE</a>.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Information;
