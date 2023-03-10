import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from 'react'
import { WalletContext } from "../../../App";

import Eyeke from "../../../assets/imgs/Eyeke.png";
import Kavian from "../../../assets/imgs/Kavian.png";
import Magor from "../../../assets/imgs/Magor.png";
import Naron from "../../../assets/imgs/Naron.png";
import Neri from "../../../assets/imgs/Neri.png";
import Veles from "../../../assets/imgs/Veles.png"
import { smartcontract } from "../../../config";
import { fetchTable } from "../../../plugins/chain";


function PlanetView() {
  const {planet} = useContext(WalletContext)
  const [picture, setPicture] = useState("")
  const [unionPower, setUnionPower] = useState("0 TLM")
  const [support, setSupport] = useState("0 TLM")
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  async function getData(){
    switch(planet){
      case "eyeke":
        setPicture(Eyeke)
        break;
      case "naron":
        setPicture(Naron)
        break;
      case "neri":
        setPicture(Neri)
        break;
      case "veles":
        setPicture(Veles)
        break;
      case "kavian":
        setPicture(Kavian)
        break;
      case "magor":
        setPicture(Magor)
        break;
    }
    var name: string
    var plant: string
    if(planet === "neri"){
      name = planet + ".dac"
      plant = planet + "x"
    } else {
      name = planet + ".dac"
      plant = planet
    }
    const x = await fetchTable({
      json: true, 
      code: smartcontract,
      scope: smartcontract,
      table: "planets",
      limit: 1,
      lower_bound: plant,
      upper_bound: plant,
    })
    const rows = x.rows
    if(rows.length){
      const z = Number(rows[0].voting_tlm.split(" ")[0]).toFixed(0)
      setUnionPower(format(z) + " TLM")
    } 
    const support = await fetchTable({
      json: true, 
      code: smartcontract,
      scope: smartcontract,
      table: "contribution",
      limit: 100,
    })
    const supportrows = support.rows
    var amount = "";
    if(supportrows.length){
      for(var i = 0; i < supportrows.length; i++)
      {
        if(supportrows[i].wallet == name)
        {
          const s =  Number(supportrows[i].votes.split(" ")[0]).toFixed(0)
          amount = format(s) + " TLM"
          break
        }
      }
      setSupport(amount)
    }
  }

  useEffect(() =>{
    getData()
  },[planet])
  return (
    <Box>
      <Typography
        paddingBottom="20px"
        color="white"
        style={{
          fontFamily: "Oxanium Medium", 
          fontSize: mobile? "32px" : "42px",
          textTransform: "capitalize"
        }}
      >
        {planet}
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
      >
        <img src={picture} alt="" width={mobile? "130px" : "160px"} />
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

function format(num: any) {
  return num.toString().replace(/^[+-]?\d+/, function(int: string) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}

export default PlanetView; 