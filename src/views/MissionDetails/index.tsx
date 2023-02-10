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

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
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
      <Box
        display="flex"
        justifyContent={desktop ? "center" : "space-between"}
        pb="20px"
      >
        <Box
          className={desktop ? classes.contentWrapper : ""}
          display="flex"
          justifyContent="space-between"
          flexDirection={desktop ? "row" : "column"}
        >
          <Box>
            <Typography
              fontSize={desktop ? "40px" : "32px"}
              py="16px"
              lineHeight="1.2"
              color="white"
              style={{ fontFamily: "Oxanium Medium" }}
            >
              Timothy
            </Typography>
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
              345,984
            </Typography>
            <Typography
              fontSize="12px"
              color="#EBB309"
              pl="16px"
              pb="4px"
              style={{ fontFamily: "Oxanium Light" }}
            >
              Vote for Timothy
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
    </>
  );
}

export default MissionDetails;
