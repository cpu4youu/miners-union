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
import velesprofile from "../../assets/imgs/velesprofile.png";
import rocket from "../../assets/imgs/rocket.png";
import BackButtonIcon from "../../assets/icons/backbutton.png";
import { fetchTable, checkLogin, transaction } from "../../plugins/chain";
import { WalletContext } from "../../App";
import { smartcontract } from "../../config";

interface IMission{
  key: number,
  creator: string,
  endtime: string,
  starttime: string
  reward: string,
  unclaimed: string,
  power: number,
}

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function MissionDetails() {
  const {wallet, tlmPower} = useContext(WalletContext)
  const [maxSpace, setMaxSpace] = useState(0)
  const [data, setData] = useState<IMission>()
  const [time, setTime] = useState<string>("0")
  const [bid, setBid] = useState<string>("0")
  const [rewardship, setRewardShip] = useState<string>("0")
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const location = useLocation();
  let navigate = useNavigate();
  const [Amount, setAmount] = useState<number>(0);
  const handleClickMenu = (link: string) => {
    navigate(link);
  };

  const doBid = async() => {
    try {
      if(Amount > 0 && wallet.name){
        const x = await transaction({
          actions: [{
            account: smartcontract,
            name: 'tlmbid',
            authorization: [{
              actor: wallet.name,
              permission: 'active',
            }],
            data: {
              wallet : wallet.name,
              pool_index: data?.key,
              tlm_power: Amount
            },
          }]
        })
        if(x){
          alert(`You succesfully send ${Amount} Spaceships on this mission`)
        }
      }
    } catch(e) {
      alert(e)
    }
  }

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
    setAmount(tlmPower);
  };

  useEffect(() => {
    checkLogin()
    if(location.state){
      const data: IMission = location.state.Data
      var rewardps: number
      const tlm = Number(data.reward.slice(0, -4))
      rewardps = Number((tlm / data.power).toFixed(6))
      if(isFinite(rewardps)){
        setRewardShip(rewardps.toString())
      } else{
        setRewardShip(tlm.toString())
      }
      
      setData(data)
      setTime(location.state.time)
    } else {
       navigate('/missions')
    }
  },[])

  useEffect(()=> {
    async function x(){
      if(wallet.chainId && data){
        console.log("Test")
        let more = false
        let next = ""
        do {
          const x = await fetchTable({
            json: true, 
            code: smartcontract,
            scope: smartcontract,
            table: "tlmbids",
            limit: 100,     
            lower_bound: next
        })
        next = x.next_key
        more = x.more 
        x.rows.map((value:any) =>{
          console.log(value)
          if(value.pool_index === data.key && value.wallet === wallet.name){
            setBid(value.total_bid.toString())
          }
        })
        } while(more) 
      }
    }
    x()
  
  },[wallet])

  useEffect(() => {

  }, [])
  return (
    <>
      <Button onClick={() => handleClickMenu("/missions")}>
        <img
          src={BackButtonIcon}
          alt=""
          width="30px"
          style={{ marginLeft: desktop ? "48px" : "16px", marginTop: "36px" }}
        />
      </Button>
      <Box display="flex" justifyContent={desktop ? "center" : ""} pb="20px">
        <Box
          className={desktop ? classes.contentWrapper : classes.mobileWrapper}
        >
          <Box
            pt="24px"
            pb="20px"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                lineHeight="30px"
                fontWeight="700"
                color="white"
                style={{ fontFamily: "Oxanium Medium" }}
              >
                Time Remaining:
              </Typography>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                lineHeight="30px"
                fontWeight="700"
                color="white"
                style={{ fontFamily: "Oxanium Medium" }}
              >
                {time}
              </Typography>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                fontWeight="700"
                style={{ fontFamily: "Oxanium Medium" }}
                lineHeight="30px"
                color="#FFB800"
                pt="64px"
              >
                {data?.reward}
              </Typography>
            </Box>
            <Box>
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "36px" : "28px"}
                fontWeight="700"
                lineHeight="45px"
                color="white"
              >
                {data?.creator}
              </Typography>
              <Box
                component="img"
                src={velesprofile}
                width={desktop ? "134px" : "100px"}
                height={desktop ? "134px" : "100px"}
                pt="32px"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            ml={desktop ? "-64px" : "2px"}
            justifyContent="flex-start"
          >
            <Box
              component="img"
              src={rocket}
              width={desktop ? "50px" : "28px"}
              height={desktop ? "52px" : "32px"}
            />
            <Box
              pl={desktop ? "16px" : "8px"}
              sx={{
                color: "white",
              }}
            >
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                {`${data?.power} spacecraft are being sent on this mission`}
              </Typography>
              <Typography
                pt="8px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                {`${rewardship} TLM would be paid out per spacecraft if the drop ended
                right now`} 
              </Typography>
              <Typography
                pt="34px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "24px" : "20px"}
                fontWeight="700"
                lineHeight="30px"
              >
                Send in your own spacecraft to get a share of the rewards
              </Typography>
              <Typography
                pt="20px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                {`${bid} spacecraft are being sent on this mission by you`}
              </Typography>
              <Typography
                pt="8px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                {`${Number(rewardship) * Number(bid)} TLM would be yours if the drop ended right now`}
              </Typography>
            </Box>
          </Box>
          <Box className={desktop ? classes.contentWrapper : ""} mt="32px">
            <Box>
              <Typography
                fontSize="12px"
                color="#EBB309"
                pl="16px"
                pb="4px"
                style={{ fontFamily: "Oxanium Light" }}
              >
                Spacecraft
              </Typography>
              <FormControl sx={{ flexGrow: "1" }} variant="outlined">
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
                    width: "256px",
                    pr: 1,
                    background: "rgba(121, 121, 121, 0.3)",
                    border: "1px solid #FFFFFF",
                    "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </FormControl>
              <Button
                onClick={()=>{doBid()}}
                sx={{
                  display: "flex",
                  background: "#009DF5",
                  width: "256px",
                  borderRadius: "20px",
                  textAlign: "center",
                  height: "38px",
                  textTransform: "none",
                  color: "white",
                  lineHeight: "0",
                  fontSize: "18px",
                  fontFamily: "Oxanium Medium",
                  mt: "6px",
                  mb: "16px",
                  alignItems: "center",
                  "&: hover": { opacity: "0.9", background: "#FFB800" },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MissionDetails;
