import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,  
  FormControl,
  OutlinedInput,  
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import BackButtonIcon from "../../assets/icons/backbutton.png";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  contentTabletWrapper: {
    width: "580px",
  },
});

function CreateProposal() {
  const classes = useStyles();
  const theme = useTheme();

  const [proposal, setProposal] = useState("");
  const [receiveWallet, setReceiveWallet] = useState("");
  const [memo, setMemo] = useState("");
  const [tlmAmount, setTlmAmount] = useState("");
  const [description, setDescription] = useState("");
  let navigate = useNavigate();
  const handleClickMenu = (link: string) => {
    navigate(link);
  };

  const desktop = useMediaQuery(theme.breakpoints.up(1300));
  const mobile = useMediaQuery(theme.breakpoints.down(603));

  const handleProposalChange = (e: any) => {
    setProposal(e.target.value);
  };

  const handleReceiveWalletChange = (e: any) => {
    setReceiveWallet(e.target.value);
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
      <Button onClick={() => handleClickMenu("/proposals")}>
        <img
          src={BackButtonIcon}
          alt=""
          width="30px"
          style={{ marginLeft: desktop ? "48px" : "12px", marginTop: desktop? "36px" : "12px" }}
        />
      </Button>
      <Box display="flex" justifyContent={!mobile ? "center" : ""} pt={desktop? "36px" : "12px"}>
        <Box
          className={
            desktop ? classes.contentWrapper : classes.contentTabletWrapper
          }
          color="white"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: desktop ? "720px" : mobile ? "100%" : "560px",
              }}
            >
              <Box
                mr={desktop ? "20px" : "10px"}
                mb="12px"
                sx={{ width: desktop ? "100%" : mobile ? "100%" : "45%" }}
              >
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Proposal Name
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: "100%" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={proposal}
                    onChange={handleProposalChange}
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
                sx={{ width: desktop ? "220px" : mobile ? "100%" : "45%" }}
              >
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  TLM Amount
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: "100%" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={tlmAmount}
                    onChange={handleTlmAmountChange}
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
                sx={{ width: desktop ? "220px" : mobile ? "100%" : "45%" }}
              >
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Receiving Wallet
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: "100%" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={receiveWallet}
                    onChange={handleReceiveWalletChange}
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
                sx={{ width: desktop ? "220px" : mobile ? "100%" : "45%" }}
              >
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Memo
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: "100%" }}
                  variant="outlined"
                >
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
            </Box>
            <Box sx={{ width: desktop ? "220px" : mobile ? "100%" : "560px" }}>
              <Button
                sx={{
                  display: "flex",
                  marginTop: 1,
                  background: "#009DF5",
                  borderRadius: "24px",
                  border: "2px solid #009DF5",
                  textAlign: "center",
                  height: "44px",
                  textTransform: "none",
                  color: "white",
                  width: desktop ? "220px" : "100%",
                  lineHeight: "0",
                  fontSize: "20px",
                  fontFamily: "Oxanium Medium",
                  alignItems: "center",
                  boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                  "&: hover": { opacity: "0.9", background: "#009DF5" },
                }}
              >
                Create Proposal
              </Button>
              <Typography
                variant="body1"
                sx={{ width: desktop ? "220px" : "100%", mt: 3 }}
              >
                Creating a Proposal costs 100 TLM. Please make sure everything
                is correct.
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              marginTop: "24px",
              border: "1px solid rgba(154, 154, 154, 0.61)",
              width: desktop ? "100%" : mobile ? "100%" : "560px",
            }}
          />
          <Box
            mr={desktop ? "20px" : "10px"}
            mb="12px"
            mt={3}
            sx={{ width: desktop ? "100%" : mobile ? "100%" : "560px" }}
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
              sx={{ flexGrow: "1", width: "100%", mb: desktop? "0" : "32px" }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                value={description}
                multiline
                minRows={desktop ? 20 : 10}                
                onChange={handleDescriptionChange}
                aria-describedby="outlined-weight-helper-text"
                sx={{
                  borderRadius: "20px",
                  color: "white",
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
      </Box>
    </>
  );
}

export default CreateProposal;
