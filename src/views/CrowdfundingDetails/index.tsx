import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  LinearProgress,
  linearProgressClasses,
  styled,
  Modal,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  FormControl,
} from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import CloseIcon from "@mui/icons-material/Close";

import { makeStyles } from "@mui/styles";
import PlanetSelect from "./components/PlanetSelect";

import BackButtonIcon from "../../assets/icons/backbutton.png";
import { WalletContext } from "../../App";
import { checkLogin, fetchTable, transaction } from "../../plugins/chain";
import { smartcontract, planets } from "../../config";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
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

const boxStyle = {
  p: "16px 0 16px 20px",
  fontSize: "20px",
  color: "white",
  fontFamily: "0xanium Light",
  borderTopLeftRadius: "12px",
  borderBottomLeftRadius: "12px",
  borderTopRightRadius: "12px",
  borderBottomRightRadius: "12px",
  background: "rgba(255, 255, 255, 0.04)",
  marginBottom: "20px",
};

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  contentTabletWrapper: {
    width: "580px",
  },
});

interface IProposal {
  business_model: string;
  claimed_funding: string;
  creation_date: string;
  crowdfunding_id: number;
  daorules: number;
  description: string;
  downvotes: number;
  duration: string;
  funding_date: string;
  objective: string;
  overview: string;
  received_funding: string;
  requested_funding: string;
  submitted_by: string;
  teaminfo: string;
  title: string;
  to: string;
  upvotes: number;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#0C8918" : "#308fe8",
  },
}));

const listPlanet = planets;

const StyledButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  border: "none",
  background: "transparent",
  cursor: "pointer",
});
const ButtonsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const ForwardIconTop = styled(ForwardIcon)(
  ({ isvote }: { isvote: number }) => ({
    transform: "rotate(-90deg)",
    fontSize: "4rem",
    color: isvote ? "green" : "white",
  })
);

const ForwardIconDown = styled(ForwardIcon)(
  ({ isvote }: { isvote: number }) => ({
    transform: "rotate(90deg)",
    fontSize: "4rem",
    color: isvote ? "red" : "white",
  })
);

function CrowdfundingDetails() {
  const [selectedPlanet, setSelectedPlanet] = useState("None");
  const [proposal, setProposal] = useState<IProposal>();
  // const [time, setTime] = useState<string>("");
  const { votePower, wallet } = useContext(WalletContext);
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [voteStatus, setVoteStatus] = useState({ up: 0, down: 0 });
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [tlmAmount, setTlmAmount] = useState<number>(10);
  let navigate = useNavigate();
  var key: string | null = null;
  if (location.state) {
    key = location.state.key;
  }
  const handleClickMenu = (link: string) => {
    navigate(link);
  };

  const handleVoteAmountChange = (e: any) => {
    const floatRegExp = new RegExp("([0-9]+([.][0-9]*)?|[.][0-9]+)$");
    const dotRegExp = new RegExp("^([0-9]+[.][0]*)$");
    if (e.target.value === "" || floatRegExp.test(e.target.value)) {
      let filteredValue = e.target.value;
      if (dotRegExp.test(e.target.value)) {
        setTlmAmount(filteredValue);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filteredValue = Math.floor(filteredValue * 1000) / 1000;
        setTlmAmount(filteredValue);
      }
    }
  };

  const handleSubmit = async () => {
    console.log({
      from: wallet.name,
      to: "hq.mu",
      quantity: tlmAmount + " TLM",
      memo: "crowdfunding," + key,
    });
    try {
      await checkLogin();
      if (wallet.name) {
        const t = await transaction({
          actions: [
            {
              account: "alien.worlds",
              name: "transfer",
              authorization: [
                {
                  actor: wallet.name,
                  permission: "active",
                },
              ],
              data: {
                from: wallet.name,
                to: "hq.mu",
                quantity: tlmAmount.toFixed(4) + " TLM",
                memo: "crowdfunding," + key,
              },
            },
          ],
        });
        if (t) {
          alert("Successfully Funded the Campaign");
          setTlmAmount(10);
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  function calculatePercentage(
    receivedFunding?: string,
    totalFunding?: string
  ) {
    if (!receivedFunding || !totalFunding) {
      return undefined;
    }

    const received = parseFloat(receivedFunding.replace(" TLM", ""));
    const total = parseFloat(totalFunding.replace(" TLM", ""));

    const currentPercentage = Math.round((received / total) * 10000) / 100;
    if (currentPercentage > 100) {
      setPercentage(100);
    } else {
      setPercentage(currentPercentage);
    }
  }

  function calculateDaysAndHours(dateTimeStr: string) {
    dateTimeStr = dateTimeStr + "Z";
    const targetDateTime = new Date(dateTimeStr);
    const now = new Date();

    const timeDiff: number = targetDateTime.getTime() - now.getTime();
    const daysDiff: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff: number = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    setDaysLeft(daysDiff);
    setHoursLeft(hoursDiff);
  }

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleVote = async (type: boolean) => {
    try {
      await checkLogin();
      if (wallet.name) {
        const t = await transaction({
          actions: [
            {
              account: smartcontract,
              name: "votecrowdf",
              authorization: [
                {
                  actor: wallet.name,
                  permission: "active",
                },
              ],
              data: {
                wallet: wallet.name,
                crowdfunding_proposal_id: key,
                vote_type: type,
                remove_vote: false,
              },
            },
          ],
        });
        if (t) {
          alert("Succesfully voted for the proposal");
          setVoteStatus({ up: type ? 1 : 0, down: type ? 0 : 1 });
        }
      } else {
        console.log("Not Logged in please refresh");
      }
    } catch (e) {
      console.log(e);
    }
  };

  function findObjectById(list: any[], id: any) {
    const result = list.find((obj) => obj.crowdfunding_proposal_id === id);
    if (result) {
      result.vote_type
        ? setVoteStatus({ up: 1, down: 0 })
        : setVoteStatus({ up: 0, down: 1 });
    }
  }

  useEffect(() => {
    async function fetchProposal() {
      const r = await fetchTable({
        json: true,
        code: smartcontract,
        scope: smartcontract,
        table: "crowdfunding",
        limit: 1,
        lower_bound: key,
        upper_bound: key,
      });
      if (r.rows[0]) {
        setProposal(r.rows[0]);
      }
    }

    async function fetchCrowdvotes() {
      const r = await fetchTable({
        json: true,
        code: smartcontract,
        scope: wallet.name,
        table: "crowdvotes",
        limit: 100,
        lower_bound: 0,
        upper_bound: 999999999,
      });
      findObjectById(r.rows, key);
    }

    fetchProposal();
    fetchCrowdvotes();
  }, [key, wallet.name, voteStatus, tlmAmount]);

  useEffect(() => {
    calculatePercentage(
      proposal?.received_funding,
      proposal?.requested_funding
    );
    if (proposal?.funding_date) {
      calculateDaysAndHours(proposal?.funding_date);
    }
  }, [proposal, voteStatus]);

  const desktop = useMediaQuery(theme.breakpoints.up(1300));
  const mobile = useMediaQuery(theme.breakpoints.down(603));
  return (
    <>
      <Button onClick={() => handleClickMenu("/crowdfundings")}>
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
            <Box style={{ width: "50%" }}>
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "40px" : "28px"}
                fontWeight={desktop ? "700" : "500"}
                lineHeight="1.1"
                pb={mobile ? "12px" : "0"}
                color="white"
              >
                {proposal?.title}
              </Typography>
              <Typography variant="h6">by {proposal?.submitted_by}!</Typography>
              <Box mt={2}>
                <BorderLinearProgress
                  variant="determinate"
                  value={percentage}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: desktop ? "220px" : "100%",
                flexDirection: desktop ? "column" : mobile ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: desktop ? "100%" : mobile ? "100%" : "45%",
                  visibility: "hidden",
                }}
              >
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
              width: "100%",
            }}
          >
            <Box>
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "40px" : "28px"}
                fontWeight={desktop ? "700" : "500"}
                lineHeight="1.1"
                pb={mobile ? "12px" : "0"}
                color="green"
              >
                {proposal?.received_funding}
              </Typography>
              <Typography variant="h6" color="#049913">
                funded of {proposal?.requested_funding}
              </Typography>
              <Button
                onClick={() => handleModalOpen()}
                sx={{
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
                Fund Campaign
              </Button>
              <Typography variant="h6" color="#FFB901">
                Fund this campaign by transferring TLM to hq.mu with the memo
                "crowdfunding,{key}"
              </Typography>
              <Typography variant="h5">
                {daysLeft} days and {hoursLeft} hours to go
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: desktop ? "220px" : "100%",
                flexDirection: desktop ? "column" : mobile ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  fontFamily="Oxanium Medium"
                  fontSize={desktop ? "40px" : "28px"}
                  fontWeight={desktop ? "700" : "500"}
                  lineHeight="1.1"
                  pb={mobile ? "12px" : "0"}
                  color="white"
                >
                  {proposal?.upvotes != null && proposal?.downvotes != null
                    ? proposal.upvotes - proposal.downvotes
                    : 0}
                </Typography>
                <Typography variant="h6">Community Score</Typography>
                <Typography variant="h6" color="#049913">
                  Total Users vote:{" "}
                  {proposal?.upvotes != null && proposal?.downvotes != null
                    ? proposal.upvotes + proposal.downvotes
                    : 0}
                </Typography>
                <ButtonsContainer>
                  <StyledButton onClick={async () => await handleVote(true)}>
                    <ForwardIconTop isvote={voteStatus.up} />
                  </StyledButton>
                  <StyledButton onClick={async () => await handleVote(false)}>
                    <ForwardIconDown isvote={voteStatus.down} />
                  </StyledButton>
                </ButtonsContainer>
              </Box>
            </Box>
          </Box>

          <Divider
            sx={{
              border: "1px solid rgba(154, 154, 154, 0.61)",
            }}
          />
          <Box mt={2}></Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              The Overview, a TLDR
            </Typography>
            <Typography>{proposal?.overview}</Typography>
          </Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              The Objectives. Which problem is getting solved with your
              proposal?
            </Typography>
            <Typography>{proposal?.objective}</Typography>
          </Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              Description - A detailed breakdown of your campaign.
            </Typography>
            <Typography>{proposal?.description}</Typography>
          </Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              Business Model - How will further funding for the project work?
            </Typography>
            <Typography>{proposal?.business_model}</Typography>
          </Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              Duration - When do you plan to finish the milestones specified in
              your campaign
            </Typography>
            <Typography>{proposal?.duration}</Typography>
          </Box>
          <Box pr="12px" display="flex" flexDirection="column" sx={boxStyle}>
            <Typography variant="h6" color="#019DF4">
              Teaminfo - Information about your team members and contact
              information
            </Typography>
            <Typography>{proposal?.teaminfo}</Typography>
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
                textAlign="center"
                fontFamily="Oxanium Light"
                mt="24px"
                mb="36px"
              >
                How much TLM do you want to fund this campaign with?
              </Typography>
              <Typography
                variant="body1"
                fontSize="16px"
                textAlign="center"
                fontFamily="Oxanium Light"
                mt="24px"
                mb="36px"
              >
                Minimum 10 TLM
              </Typography>
              <Box display="flex" justifyContent="center">
                <FormControl sx={{ flexGrow: "1" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={tlmAmount}
                    onChange={handleVoteAmountChange}
                    aria-describedby="outlined-weight-helper-text"
                    endAdornment={
                      <InputAdornment position="end"></InputAdornment>
                    }
                    sx={{
                      borderRadius: "20px",
                      color: "white",
                      width: "100%",
                      pr: 1,
                      background: "rgba(121, 121, 121, 0.3)",
                      border: "1px solid #FFFFFF",
                      "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>

              <Button
                onClick={handleSubmit}
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
                Fund!
              </Button>
            </Box>
          </Modal>
        </Box>
        {/* <Modal
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
            <FormControl
              sx={{ display: "flex", alignItems: "center", flexGrow: "1" }}
              variant="outlined"
            >
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
                  </InputAdornment>
                }
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
        </Modal> */}
      </Box>
    </>
  );
}

export default CrowdfundingDetails;
