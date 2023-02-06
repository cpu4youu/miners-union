import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

import MagorCombinedIcon from "../../../assets/imgs/magorcombined.png";

function MagorView() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  return (
    <Box>
      <Typography
        paddingBottom="20px"
        color="white"
        style={{fontFamily: "Oxanium Medium", fontSize: mobile? "32px" : "42px"}}
      >
        Magor
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
      >
        <img src={MagorCombinedIcon} alt="" width={mobile? "130px" : "160px"} />
        <Box
          display="flex"
          flexDirection="column"
          marginLeft="8px"
        >
          <Typography
            color="white"
            fontSize="14px"
            style={{fontFamily: "Oxanium Light"}}
          >
            Union Vote Power: 1,500,000
          </Typography>
          <Typography
            color="white"
            fontSize="14px"
            paddingTop={mobile? "2px" : "8px"}
            style={{fontFamily: "Oxanium Light"}}
          >
            Received Support: 600k TLM
          </Typography>
        </Box>
      </Box>


    </Box>
  );

}

export default MagorView; 