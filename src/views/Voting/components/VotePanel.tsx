import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import arrowDownIcon from "../../../assets/icons/arrowDown.svg";

interface IVotePanelProps {
  desktop: boolean;
}

function VotePanel(props: IVotePanelProps) {
  const { desktop } = props;
  const [candidataNameOne, setCandidateOne] = useState("None");
  const [candidataNameTwo, setCandidateTwo] = useState("None");
  const [candidataNameThree, setCandidateThree] = useState("None");
  const [candidataNameFour, setCandidateFour] = useState("None");

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
        <Box
          mr="20px"
        >
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 1
          </FormHelperText>
          <Select
            value={candidataNameOne}
            onChange={(event) => setCandidateOne(event.target.value)}
            // displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={() => (
              <Box component="img" src={arrowDownIcon} sx={{ mr: 2 }} alt="" />
            )}
            sx={{
              width: desktop ? "220px" : "140px",
              border: "1px solid white",
              borderRadius: "20px",
              color: "white",
              height: "45px",
              backgroundColor: "rgba(121, 121, 121, 0.3)",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(25, 25, 25, 0.8)",
                  color: "white",
                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Naron">Naron</MenuItem>
            <MenuItem value="Eyeke">Eyeke</MenuItem>
            <MenuItem value="Kavian">Kavian</MenuItem>
          </Select>
        </Box>
        <Box
          mr="20px"
        >
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 2
          </FormHelperText>
          <Select
            value={candidataNameTwo}
            onChange={(event) => setCandidateTwo(event.target.value)}
            // displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={() => (
              <Box component="img" src={arrowDownIcon} sx={{ mr: 2 }} alt="" />
            )}
            sx={{
              width: desktop ? "220px" : "140px",
              border: "1px solid white",
              borderRadius: "20px",
              color: "white",
              height: "45px",
              backgroundColor: "rgba(121, 121, 121, 0.3)",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(25, 25, 25, 0.8)",
                  color: "white",
                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Naron">Naron</MenuItem>
            <MenuItem value="Eyeke">Eyeke</MenuItem>
            <MenuItem value="Kavian">Kavian</MenuItem>
          </Select>
        </Box>
        <Box
          mr="20px"
        >
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 3
          </FormHelperText>
          <Select
            value={candidataNameThree}
            onChange={(event) => setCandidateThree(event.target.value)}
            // displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={() => (
              <Box component="img" src={arrowDownIcon} sx={{ mr: 2 }} alt="" />
            )}
            sx={{
              width: desktop ? "220px" : "140px",
              border: "1px solid white",
              borderRadius: "20px",
              color: "white",
              height: "45px",
              backgroundColor: "rgba(121, 121, 121, 0.3)",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(25, 25, 25, 0.8)",
                  color: "white",
                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Naron">Naron</MenuItem>
            <MenuItem value="Eyeke">Eyeke</MenuItem>
            <MenuItem value="Kavian">Kavian</MenuItem>
          </Select>
        </Box>
        <Box
          mr="20px"
        >
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Candidate 4
          </FormHelperText>
          <Select
            value={candidataNameFour}
            onChange={(event) => setCandidateFour(event.target.value)}
            // displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={() => (
              <Box component="img" src={arrowDownIcon} sx={{ mr: 2 }} alt="" />
            )}
            sx={{
              width: desktop ? "220px" : "140px",
              border: "1px solid white",
              borderRadius: "20px",
              color: "white",
              height: "45px",
              backgroundColor: "rgba(121, 121, 121, 0.3)",
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(25, 25, 25, 0.8)",
                  color: "white",
                  "& .MuiMenuItem-root": {
                    padding: 2,
                  },
                },
              },
            }}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Naron">Naron</MenuItem>
            <MenuItem value="Eyeke">Eyeke</MenuItem>
            <MenuItem value="Kavian">Kavian</MenuItem>
          </Select>
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
          lineHeight: '0',
          fontSize: "20px",
          fontFamily: "Oxanium Medium",
          alignItems: "center",
          '&: hover': {opacity: '0.9', background: "#FFB800"},
        }}
      >
        Vote
      </Button>
      <Typography        
        color="#F9F9F9"
        mt="16px"
        textAlign="center"
        style={{fontFamily: 'Oxanium'}}
      >
        33,000 votes per candidate
      </Typography>
    </>
  );
}

export default VotePanel;
