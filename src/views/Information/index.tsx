import { useState } from "react";
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

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
});

const listPlanet = ["Planet1", "Planet2"];

function Information() {
  const [selectedPlanet, setSelectedPlanet] = useState("None");
  const [proposer, setProposer] = useState("tdxa3.wam");
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
            fontFamily="Oxanium Medium"
            fontSize={desktop ? "24px" : "20px"}
            pt={desktop ? "64px" : "40px"}
            fontWeight="400"
            lineHeight="25px"
          >
            Support the Union with Voting Power
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="8px"
            lineHeight="20px"
            color="rgba(255, 255, 255, 0.66)"
          >
            Give Miners a voice in the DAO
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="24px"
            lineHeight="20px"
          >
            Your planet can decide to support the Miners Union with Voting
            Power. This helps the Miners Union to gain influence and allows
            Miners to vote for the candidates they like with NFT Points.
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            mt="24px"
            sx={{ maxWidth: desktop ? "800px" : "580px" }}
          >
            <Box mr={desktop ? "20px" : "10px"} mb="12px">
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                Planet
              </FormHelperText>
              <PlanetSelect
                listPlanet={listPlanet}
                selectedPlanet={selectedPlanet}
                setSelectedPlanet={setSelectedPlanet}
                desktop={desktop}
              />
            </Box>

            <Box mr={desktop ? "20px" : "10px"} mb="12px">
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                Proposer
              </FormHelperText>
              <FormControl sx={{ flexGrow: "1" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={proposer}
                  onChange={handleProposerChange}
                  aria-describedby="outlined-weight-helper-text"
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    width: desktop ? "220px" : "160px",
                    height: "45px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>

            <Box mr={desktop ? "20px" : "10px"} mb="12px">
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                Title
              </FormHelperText>
              <FormControl sx={{ flexGrow: "1" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={title}
                  onChange={handleTitleChange}
                  aria-describedby="outlined-weight-helper-text"
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    width: desktop ? "220px" : "160px",
                    height: "45px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>
            <IconButton
              sx={{ mt: desktop ? 2 : 2 }}
              aria-label="send"
              size="large"
            >
              <SendIcon color="primary" fontSize="inherit" />
            </IconButton>

            <Box mr={desktop ? "20px" : "10px"} mb="12px">
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                TLM Amount
              </FormHelperText>
              <FormControl sx={{ flexGrow: "1" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={tlmAmount}
                  onChange={handleTlmAmountChange}
                  aria-describedby="outlined-weight-helper-text"
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    width: desktop ? "220px" : "160px",
                    height: "45px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>

            <Box mr={desktop ? "0" : "10px"} mb="12px" sx={{width: mobile ? '100%' : '65%'}}>
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                Memo
              </FormHelperText>
              <FormControl sx={{ flexGrow: "1", width: desktop ? "540px" : "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={memo}
                  onChange={handleMemoChange}
                  aria-describedby="outlined-weight-helper-text"
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    height: "45px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              mr={desktop ? "20px" : "10px"}
              mb="12px"
              sx={{ width: "100%" }}
            >
              <FormHelperText
                sx={{
                  color: "#EBB309",
                  fontFamily: "Oxanium Light",
                  marginLeft: "16px",
                }}
              >
                Description
              </FormHelperText>
              <FormControl
                sx={{ flexGrow: "1", width: "100%" }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={description}
                  multiline
                  minRows={4}
                  onChange={handleDescriptionChange}
                  aria-describedby="outlined-weight-helper-text"
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    maxWidth: desktop ? "780px" : "100%",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Typography
            fontFamily="Oxanium Medium"
            fontSize={desktop ? "24px" : "20px"}
            pt={desktop ? "64px" : "40px"}
            fontWeight="400"
            lineHeight="25px"
          >
            Support the Union with TLM Missions
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            pt="8px"
            lineHeight="20px"
            color="rgba(255, 255, 255, 0.66)"
          >
            Make it rain! Share some of Alien Worlds riches with the miners.
          </Typography>
          <Typography
            fontFamily="Oxanium Light"
            fontSize="16px"
            fontWeight="300"
            py="24px"
            lineHeight="20px"
          >
            Possibly the best way to drop TLM to legit players is launching a
            mission in the Miners Union. In the Union we check each and every
            player...
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Information;
