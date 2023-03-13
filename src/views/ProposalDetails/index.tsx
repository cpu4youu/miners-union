import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

import { makeStyles } from "@mui/styles";
import PlanetSelect from "./components/PlanetSelect";

import BackButtonIcon from "../../assets/icons/backbutton.png";
import { WalletContext } from "../../App";
import { checkLogin, fetchTable, transaction } from "../../plugins/chain";
import { smartcontract, planets } from "../../config";
import { isWhiteSpaceLike } from "typescript";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "background.paper",
  background: "#1C1C1C",
  borderRadius: "20px",
  border: "1px solid #4D4D4D",
  outline: "transparent solid 2px",
  outlineOffset: "2px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
  p: 2,
};

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  contentTabletWrapper: {
    width: "580px",
  },
});

interface IProposal{
  archive_date: string,
  creation_date: string,
  description: string,
  from: string,
  memo: string,
  proposal_name: string,
  title: string,
  tlm: string,
  to: string,
  votes: number,
}


const listPlanet = planets;

function ProposalDetails() {
  const [selectedPlanet, setSelectedPlanet] = useState("None");
  const [proposal, setProposal] = useState<IProposal>()
  const [time, setTime] = useState<string>("")
  const {votePower, wallet} = useContext(WalletContext)
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [Amount, setAmount] = useState<number>(0);
  let navigate = useNavigate();
  var key: string
  if(location.state){
    key = location.state.key
  }
  const handleClickMenu = (link: string) => {
    navigate(link);
  };
  
  const handleAmountChange = (e: any) => {
    const floatRegExp = new RegExp("([0-9]+([.][0-9]*)?|[.][0-9]+)$");
    const dotRegExp = new RegExp("^([0-9]+[.][0]*)$");
    if (e.target.value === "" || floatRegExp.test(e.target.value)) {
      let filteredValue = e.target.value;
      if (dotRegExp.test(e.target.value)) {
        setAmount(filteredValue);
      } else {
  
        filteredValue = Math.floor(filteredValue * 1000) / 1000;
        setAmount(filteredValue);
      }
    }
  };

  const handleMaxValue = () => {
    setAmount(votePower);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleVote = async () => {
    try{
      await checkLogin()
      if(wallet.name){
          const t = await transaction({
            actions: [{
              account: smartcontract,
              name: 'voteproposal',
              authorization: [{
                actor: wallet.name,
                permission: 'active',
              }],
              data: {
                wallet: wallet.name,
                proposal_name: key,
                votes: Amount
              },
            }]
          })
          if(t){
            alert("Succesfully voted for the proposal")
            console.log(t)
          }
      } else {
        console.log("Not Logged in please refresh")
      }
      
    } catch(e){
      console.log(e)
    }
  }

  useEffect(()=> {
    async function x(){
      const r = await fetchTable({
        json: true,
        code: smartcontract, 
        scope: smartcontract,
        table: "proposals",
        limit: 1,     
        lower_bound: key,
        upper_bound: key
      })
      if(r.rows[0]){
        setProposal(r.rows[0])
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        const date = new Date(r.rows[0].creation_date)
        //@ts-ignore
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const formattedDate = formatter.format(date);
        setTime(formattedDate)
      }
    }
    x()
  }, [])

  const desktop = useMediaQuery(theme.breakpoints.up(1300));
  const mobile = useMediaQuery(theme.breakpoints.down(603));
  return (
    <>
      <Button onClick={() => handleClickMenu("/proposals")}>
        <img
          src={BackButtonIcon}
          alt=""
          width="30px"
          style={{
            marginLeft: desktop ? "48px" : "12px",
            marginTop: desktop ? "36px" : "12px",
          }}
        />
      </Button>
      <Box
        display="flex"
        justifyContent={!mobile ? "center" : ""}
        pt={desktop ? "36px" : "12px"}
      >
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
              width: "100%",
            }}
          >
            <Box>
              <Typography
                fontSize={desktop ? "40px" : "28px"}
                lineHeight="1.1"
                fontWeight={600}
              >
                {proposal?.title}
              </Typography>
              <Typography variant="h6">by {proposal?.from}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: desktop ? "220px" : "100%",
                flexDirection: desktop ? "column" : mobile ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: desktop ? "100%" : mobile ? "100%" : "45%" , visibility: "hidden",}}>
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
              <Button
                sx={{
                  display: "flex",
                  marginTop: 1,
                  background: "#FFB800",
                  mt: desktop ? "8px" : mobile ? "8px" : "24px",
                  width: desktop ? "220px" : mobile ? "100%" : "45%",
                  border: "2px solid #FFB800",
                  borderRadius: "24px",
                  textAlign: "center",
                  height: "44px",
                  textTransform: "none",
                  color: "white",
                  lineHeight: "0",
                  fontSize: "20px",
                  fontFamily: "Oxanium Medium",
                  alignItems: "center",
                  boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                  "&: hover": { opacity: "0.9", background: "#FFB800" },
                  visibility: "hidden",
                }}
              >
                Copy to Planet
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 2,
              width: "100%",
            }}
          >
            <Typography color="#FFB800" fontSize={desktop ? "36px" : "20px"}>
              {proposal?.tlm}
            </Typography>
            <Button
              sx={{
                display: "flex",
                marginTop: 1,
                background: "#009DF5",
                borderRadius: "24px",
                border: "2px solid #009DF5",
                width: desktop ? "220px" : mobile ? "100%" : "45%",
                textAlign: "center",
                height: "44px",
                textTransform: "none",
                color: "white",
                lineHeight: "0",
                fontSize: "20px",
                fontFamily: "Oxanium Medium",
                alignItems: "center",
                boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                "&: hover": { opacity: "0.9", background: "#009DF5" },
              }}
              onClick={() => handleModalOpen()}
            >
              Vote
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            <Typography variant="h6">
              Submission Date: {time}
            </Typography>
            <Typography variant="h6">Receiving Wallet: {proposal?.to}</Typography>
          </Box>
          <Divider
            sx={{
              marginTop: "24px",
              border: "1px solid rgba(154, 154, 154, 0.61)",
            }}
          />
          <Box>
            <Typography fontSize={desktop ? "20px" : "18px"} mt={3}
            style={{whiteSpace:"pre-wrap"}}>
             {proposal?.description}
            </Typography>
          </Box>
        </Box>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box color="white" sx={modalStyle}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton sx={{ padding: "0" }} onClick={handleModalClose}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Typography
              variant="body1"
              fontSize="16px"
              mt="24px"
              textAlign="center"
              fontFamily="Oxanium Light"
            >
              Please choose how many votes you want to spend on this proposal.
            </Typography>
            <Typography
              variant="body1"
              fontSize="16px"
              textAlign="center"
              fontFamily="Oxanium Light"
              mt="24px"
              mb="16px"
            >
              Higher ranked proposals show the will of the community and are
              more likely to be accepted by custodians.
            </Typography>
            <FormControl sx={{ display: "flex", alignItems: "center", flexGrow: "1" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={Amount}
                onChange={handleAmountChange}
                aria-describedby="outlined-weight-helper-text"
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      sx={{
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "12px",
                        padding: "2px 4px",
                        minWidth: "44px",
                        fontSize: "10px",
                      }}
                      onClick={handleMaxValue}
                    >
                      Max
                    </Button>
                  </InputAdornment>}
                sx={{
                  borderRadius: "20px",
                  color: "white",
                  width: desktop ? "220px" : "100%",                  
                  pr: 1,
                  background: "rgba(121, 121, 121, 0.3)",
                  border: "1px solid #FFFFFF",
                  "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              />
            </FormControl>
            <Button
              onClick={handleVote}
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
                m: "12px auto",
                width: desktop ? "220px" : "100%",
                lineHeight: "0",
                fontSize: "20px",
                fontFamily: "Oxanium Medium",
                alignItems: "center",
                boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                "&: hover": { opacity: "0.9", background: "#009DF5" },
              }}
            >
              Vote
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default ProposalDetails;
