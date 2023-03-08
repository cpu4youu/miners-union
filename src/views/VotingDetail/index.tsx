import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { smartcontract } from "../../config";
import { fetchTable, transaction } from "../../plugins/chain";
import { WalletContext } from "../../App";
import BackButtonIcon from "../../assets/icons/backbutton.png";
import eyekeprofile from "../../assets/imgs/eyekeprofile.png";
import DescriptiveLine from "../../assets/icons/descriptiveline.png";

interface IData{
  key: number,
  icon: string,
  from: string,
  rewards: string,
  spaceships: number,
  timeremaining: string,
}

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
});

function VotingDetail() {
  const {wallet, votePower} = useContext(WalletContext)
  const [name, setName] = useState("-")
  const [img, setImg] = useState("-")
  const [description, setDescription] = useState("-")
  const [slogan , setSlogan] = useState("-")
  const [votes, setVotes] = useState(0)

  const location = useLocation();
  const wallet_name = location.state.wallet
  const index = location.state.index
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  let navigate = useNavigate();
  const [voteAmount, setVoteAmount] = useState<number>(0);
  const handleClickMenu = (link: string) => {
    navigate(link);
  };

  const handleVote = async () => {
    const x = await transaction({
      actions: [{
        account: smartcontract,
        name: 'castvote',
        authorization: [{
          actor: wallet.name,
          permission: 'active',
        }],
        data: {
          wallet: wallet.name,
          new_candidates: [wallet_name],
          planet: "eyeke",
          votes: voteAmount,
        },
      }]
    })
    if(x){
      alert(`You succesfully voted`)
    }
  }

  async function getDate(){
    const x = await fetchTable({
      json: true, 
      code: smartcontract,
      scope: smartcontract,
      table: "candprofiles",
      limit: 1,     
      lower_bound: wallet_name ,
      upper_bound: wallet_name 
    })
    if(x.rows[0]){
      setName(x.rows[0].candidate)
      setImg(x.rows[0].profile_image)
      setDescription(x.rows[0].description)
      setSlogan(x.rows[0].slogan)
    }

    const y = await fetchTable({
      json: true, 
      code: smartcontract,
      scope: smartcontract,
      table: "candidates",
      limit: 1,     
      lower_bound: index,
    })
    if(y.rows[0]){
      setVotes(y.rows[0].votes)
    }
  }

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
    setVoteAmount(votePower);
  };

  useEffect(()=> {
    getDate()
  },[])
  return (
    <>
      <Box p={desktop ? "24px 36px" : "16px 0"}>
        <Button onClick={() => handleClickMenu("/voting")}>
          <img
            src={BackButtonIcon}
            alt=""
            width="30px"
            style={{ marginLeft: "16px" }}
          />
        </Button>
        <Box
          display="flex"
          justifyContent={desktop ? "center" : "space-between"}
          pb="20px"
          borderBottom="1px solid rgba(255, 255, 255, 0.14)"
        >
          <Box
            className={desktop ? classes.contentWrapper : ""}
            display="flex"
            justifyContent="space-between"
            flexDirection={desktop ? "row" : "column"}
          >
            <Box pl={desktop ? "" : "24px"}>
              <Typography
                fontSize={desktop ? "40px" : "32px"}
                py="16px"
                lineHeight="1.2"
                color="white"
                style={{ fontFamily: "Oxanium Medium" }}
              >
                {name}
              </Typography>
              <Box position="relative">
                <img
                  src={img}
                  width={desktop ? "120px" : "72px"}
                  alt=""
                />
                <img
                  src={eyekeprofile}
                  alt=""
                  width={desktop ? "64px" : "40px"}
                  style={{
                    position: "absolute",
                    top: desktop ? "70px" : "44px",
                    left: desktop ? "-24px" : "-16px",
                  }}
                />
                <img
                  src={DescriptiveLine}
                  alt=""
                  width={desktop ? "320px" : "270px"}
                  style={{
                    position: "absolute",
                    top: desktop ? "64px" : "40px",
                    left: desktop ? "100px" : "20px",
                  }}
                />
                <Typography
                  fontSize={desktop ? "18px" : "14px"}
                  color="white"
                  sx={{
                    position: "absolute",
                    width: desktop ? "240px" : "180px",
                    top: desktop ? "40px" : "20px",
                    left: desktop ? "190px" : "100px",
                    fontFamily: "Oxanium Light",
                  }}
                >
                 {slogan}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                color="white"
                lineHeight="1.2"
                pt="24px"
                style={{ fontFamily: "Oxanium Light" }}
              >
                Current Votes
              </Typography>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                color="white"
                lineHeight="1.2"
                pb="20px"
                style={{ fontFamily: "Oxanium Light" }}
              >
                {votes.toString()}
              </Typography>
              <Typography
                fontSize="12px"
                color="#EBB309"
                pl="16px"
                pb="4px"
                style={{ fontFamily: "Oxanium Light" }}
              >
                Vote for {name}
              </Typography>
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
                    width: "160px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
              <Button
                onClick={()=> {handleVote()}}
                sx={{
                  display: "flex",
                  background: "#FFB800",
                  width: "160px",
                  borderRadius: "20px",
                  textAlign: "center",
                  height: "38px",
                  textTransform: "none",
                  color: "black",
                  lineHeight: "0",
                  fontSize: "18px",
                  fontFamily: "Oxanium Medium",
                  mt: "6px",
                  alignItems: "center",
                  "&: hover": { opacity: "0.9", background: "#FFB800" },
                }}
              >
                Vote
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent={desktop ? "center" : "flex-start"}
          pb="20px"
        >
          <Box className={desktop ? classes.contentWrapper : ""}>
            <Typography
              color="white"
              fontSize="24px"
              py="24px"
              style={{ fontFamily: "Oxanium Light" }}
            >
              Description
            </Typography>
            <Typography
              color="white"
              fontSize="20px"
              pb="24px"
              style={{ fontFamily: "Oxanium Light" }}
            >
              {description}
              </Typography>

          </Box>
        </Box>
      </Box>
    </>
  );
}

export default VotingDetail;
