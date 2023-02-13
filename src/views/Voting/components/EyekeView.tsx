import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { WalletContext } from "../../../App";
import { useContext, useEffect, useState } from 'react'

import MagorCombinedIcon from "../../../assets/imgs/magorcombined.png";
import { smartcontract } from "../../../config";
import { fetchTable } from "../../../plugins/chain";


function EyekeView() {
  const {wallet, setWallet, loggedIn, setLoggedIn,claimed} = useContext(WalletContext)
  const [unionPower, setUnionPower] = useState("0 EYE")
  const [support, setSupport] = useState("0 TLM")
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  async function getData(){
    const x = await fetchTable({
      json: true, 
      code: smartcontract,
      scope: smartcontract,
      table: "planets",
      limit: 1,
      lower_bound: "eyeke",
      upper_bound: "eyeke",
    })
    const rows = x.rows
    console.log(rows)
    if(rows.length){
      setUnionPower(rows[0].token)
      setSupport(rows[0].voting_tlm)
    } 
  }

  useEffect(() =>{
    getData()
  },[])
  return (
    <Box>
      <Typography
        paddingBottom="20px"
        color="white"
        style={{fontFamily: "Oxanium Medium", fontSize: mobile? "32px" : "42px"}}
      >
        Eyeke
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
            Union Vote Power: {unionPower}
          </Typography>
          <Typography
            color="white"
            fontSize="14px"
            paddingTop={mobile? "2px" : "8px"}
            style={{fontFamily: "Oxanium Light"}}
          >
            Received Support: {support}
          </Typography>
        </Box>
      </Box>


    </Box>
  );

}

export default EyekeView; 