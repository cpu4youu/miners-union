import { useEffect, useState } from "react";
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
import { fetchTable } from "../../../plugins/chain";
import { smartcontract } from "../../../config";

interface IVotePanelProps {
  desktop: boolean;
}

function VotePanel(props: IVotePanelProps) {
  const { desktop } = props;
  const [candidataNameOne, setCandidateOne] = useState("None");
  const [candidataNameTwo, setCandidateTwo] = useState("None");
  const [candidataNameThree, setCandidateThree] = useState("None");
  const [candidataNameFour, setCandidateFour] = useState("None");
  const [getCandi, setGetCandi] = useState(true)
  const [getOptions, setOptions] = useState(<></>)
  const [candidates, setCandidates] = useState([""])

  const getCandidate = async () => {
    try {
      let more = false
      let next = ""
      const candi: string[] = []
      do {
        const x = await fetchTable({
          json: true, 
          code: "dao.worlds",
          scope: "eyeke",
          table: "candidates",
          limit: 10,     
          lower_bound: next
      })
      next = x.next_key
      more = x.more 
      x.rows.forEach((value: any, key: any) => {
        const name: string = value.candidate_name
        if(value.is_active == 1){
          candi.push(name)
        }
      })
      } while(more) 
      
    return candi
    }catch(e){
      alert(e)
    }
  };

  useEffect(() =>{
    async function x(){
      let candi = []
      const y = await getCandidate()
      if(y){
        candi = y
        setCandidates(candi)
      }
      
    }
    x()
  },[])

  useEffect(()=>{
    //@ts-ignore
    setOptions(getMenuItems(candidates))
  },[candidates])
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
            {getOptions}
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
            {getOptions}
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
            {getOptions}
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
            {getOptions}
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

function getMenuItems(name: string[]){
  return name.map((x) => <MenuItem value= {x}>{x}</MenuItem>)
}


export default VotePanel;
function asnyc() {
  throw new Error("Function not implemented.");
}


