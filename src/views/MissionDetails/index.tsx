import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import velesprofile from "../../assets/imgs/velesprofile.png";
import rocket from "../../assets/imgs/rocket.png";
import BackButtonIcon from "../../assets/icons/backbutton.png";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function MissionDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  let navigate = useNavigate();
  const [Amount, setAmount] = useState<number>(0);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filteredValue = Math.floor(filteredValue * 1000) / 1000;
        setAmount(filteredValue);
      }
    }
  };

  const handleMaxValue = () => {
    setAmount(100000);
  };

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
                2d 23h 15m 10s
              </Typography>
              <Typography
                fontSize={desktop ? "24px" : "20px"}
                fontWeight="700"
                style={{ fontFamily: "Oxanium Medium" }}
                lineHeight="30px"
                color="#FFB800"
                pt="64px"
              >
                100,000 TLM
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
                veles.dac
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
                35,600 spacecraft are being sent on this mission
              </Typography>
              <Typography
                pt="8px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                2.80 TLM would be paid out per spacecraft if the drop ended
                right now
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
                500 spacecraft are being sent on this mission by you
              </Typography>
              <Typography
                pt="8px"
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "20px" : "16px"}
                fontWeight="400"
                lineHeight="25px"
              >
                1,400 TLM would be yours if the drop ended right now
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
