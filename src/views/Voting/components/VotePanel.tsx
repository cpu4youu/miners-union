import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormHelperText,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import CandidateSelect from "./CandidateSelect";

const listCandidate = ["Naron", "Eyeke", "Kavian"];

interface IVotePanelProps {
  desktop: boolean;
}

function VotePanel(props: IVotePanelProps) {
  const { desktop } = props;
  const [selectedCandidateOne, setSelectedCandidateOne] = useState("None");
  const [selectedCandidateTwo, setSelectedCandidateTwo] = useState("None");
  const [selectedCandidateThree, setSelectedCandidateThree] = useState("None");
  const [voteAmount, setVoteAmount] = useState<number>(0);

  const handleVoteAmountChange = (e: any) => {
    const floatRegExp = new RegExp("([0-9]+([.][0-9]*)?|[.][0-9]+)$");
    const dotRegExp = new RegExp("^([0-9]+[.][0]*)$");
    if (e.target.value === "" || floatRegExp.test(e.target.value)) {
      let filteredValue = e.target.value;
      if (dotRegExp.test(e.target.value)) {
        setVoteAmount(filteredValue);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filteredValue = Math.floor(filteredValue * 1000) / 1000;
        setVoteAmount(filteredValue);
      }
    }
  };

  const handleMaxValue = () => {
    setVoteAmount(100000);
  };

  return (
    <>
      <Typography
        fontSize="24px"
        color="white"
        pb="24px"
        style={{ fontFamily: "Oxanium Medium" }}
      >
        Vote for the candidates you like
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        mb="20px"
      >
        <Box mr={desktop? "20px" : "0"}>
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 1
          </FormHelperText>
          <CandidateSelect
            listCandidate={listCandidate}
            selectedCandidate={selectedCandidateOne}
            setSelectedCandidate={setSelectedCandidateOne}
            desktop={desktop}
          />
        </Box>
        <Box mr={desktop? "20px" : "0"}>
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 2
          </FormHelperText>
          <CandidateSelect
            listCandidate={listCandidate}
            selectedCandidate={selectedCandidateTwo}
            setSelectedCandidate={setSelectedCandidateTwo}
            desktop={desktop}
          />
        </Box>
        <Box mr={desktop? "20px" : "0"}>
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 3
          </FormHelperText>
          <CandidateSelect
            listCandidate={listCandidate}
            selectedCandidate={selectedCandidateThree}
            setSelectedCandidate={setSelectedCandidateThree}
            desktop={desktop}
          />
        </Box>
        <Box mr={desktop? "20px" : "0"}>
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Vote for Candidates
          </FormHelperText>
          <FormControl sx={{ flexGrow: "1" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={voteAmount}
              onChange={handleVoteAmountChange}
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
      </Box>
      <Button
        sx={{
          display: "flex",
          background: "#FFB800",
          width: "100%",
          borderRadius: "24px",
          textAlign: "center",
          height: "44px",
          textTransform: "none",
          color: "black",
          lineHeight: "0",
          fontSize: "20px",
          fontFamily: "Oxanium Medium",
          alignItems: "center",
          "&: hover": { opacity: "0.9", background: "#FFB800" },
        }}
      >
        Vote
      </Button>
      <Typography
        color="#F9F9F9"
        mt="16px"
        textAlign="center"
        style={{ fontFamily: "Oxanium Light" }}
      >
        33,000 votes per candidate
      </Typography>
    </>
  );
}

export default VotePanel;
