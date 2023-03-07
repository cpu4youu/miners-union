import { Box, Button, Tabs, Tab, Typography } from "@mui/material";
import { get } from "https";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateOneIcon from "../../../assets/imgs/candidateone.png";

import { smartcontract } from "../../../config";
import { fetchTable } from "../../../plugins/chain";

interface TabPanelProps {
  index: number;
  value: number;
  profileIcon: string;
  mobile: boolean;
}

interface Data {
  icon: string,
  candidate: string,
  slogan: string,
  wallet: string
  time: string,
}

function createData(
  icon: string,
  candidate: string,
  slogan: string,
  wallet: string,
  time: string,
) {
  return { icon, candidate, slogan, wallet, time};
}


function validURL(url: string) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


function TabPanel(props: TabPanelProps) {
  const [data, setData] = useState(Array<Data>)
  const { value, index, profileIcon, mobile, ...other } = props;
  const [profile, setProfile] = useState<Data>({
    icon : CandidateOneIcon,
    candidate: "Candidate Name",
    slogan: "Power to the Miners Union!",
    wallet: "",
    time: ""
  })

  let navigate = useNavigate();
  const handleClickMenu = (link: string, name: string) => {
    navigate(link, {
      state: {wallet: name},
      replace: true,
    });
  };


  const getData = useCallback(async () =>{
    var x: Array<Data> = []
    try {
      let more = false
      let next = ""
      do{
        const z = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "candprofiles",
          limit: 10,
          lower_bound: next,
          upper_bound: next,
        })
        next = z.next_key
        more = z.more 
        z.rows.map((value: any, key: any) => {
          var icon
          const name = value.candidate
          if(validURL(value.profile_image)){
            icon = value.profile_image
          } else {
            icon = CandidateOneIcon
          }
          const slogan = value.slogan
          const wallet = value.wallet
          const planet = value.planet
          const time = value.display_until
          if(planet ==="eyeke"){
            x.push({icon : icon, candidate: name, slogan: slogan, wallet: wallet, time: time})
          }
        })
      }while(more)
    }catch(e){
    }
    if(x.length > 0) {
      const y: Array<Data>= []
      x.map(async (value, key) =>{
        const now = Math.floor(new Date().getTime() / 1000)
        const display = Math.floor(new Date(value.time).getTime() / 1000)
        if(now < display && value.candidate !== "-"){
          y.push(createData(value.icon, value.candidate, value.slogan, value.wallet, value.time))
        }
      })
      if(y.length === 0){
        y.push(createData(
          CandidateOneIcon,
          "?",
          "Here could be your spotlight",
          "None",
          ""
        ))
      }
      setData(y)
    }
    return true
  }, [])

  useEffect(() => {
    if(data.length > 0){
      const r = data[Math.floor(Math.random() * data.length)]
      setProfile(r)
    }
  }, [data])

  useEffect(() =>{
     getData()
  },[getData])

  useEffect(() => {
    const interval = setInterval(() =>{
      if(data.length > 0){
        const r = data[Math.floor(Math.random() * data.length)]
        setProfile(r)
      }
    }, 10000);
    return () => (clearInterval(interval))
  }, [data])

  return ( 
    <>
    {profile.candidate !== "Candidate Name" && (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
        <Box paddingTop="24px">
          <Typography
            color="white"
            fontSize="20px"
            paddingBottom="20px"
            style={{ fontFamily: "Oxanium Medium" }}
          >
            Candidate Spotlight
          </Typography>
          <Box
            display="flex"
            flexGrow="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <img src={profile.icon} width={mobile ? "48px" : "64px"} alt="" />
              <Box marginLeft="12px">
                <Typography
                  color="white"
                  fontSize="14px"
                  style={{ fontFamily: "Oxanium Light" }}
                >
                  {profile.candidate}
                </Typography>
                <Typography
                  color="white"
                  fontSize="14px"
                  style={{ fontFamily: "Oxanium Light" }}
                >
                  {profile.slogan}
                </Typography>
              </Box>
            </Box>
            {profile.candidate === "?" ? 
             <Box
             style={{
              fontFamily: "Oxanium Medium",
              fontSize: "18px",
              borderRadius: "20px",
              padding: "4px 32px",
              marginLeft: mobile? "24px" : "48px",
              textTransform: 'none',                
            }}
             >
             </Box>:
            <Button
            style={{
              fontFamily: "Oxanium Medium",
              color: "white",
              fontSize: "18px",
              border: "1px solid white",
              borderRadius: "20px",
              padding: "4px 32px",
              marginLeft: mobile? "24px" : "48px",
              textTransform: 'none',                
              background:
                "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
            }}
            onClick={() => handleClickMenu("/votingdetail", profile.wallet)}
          >
            More
          </Button>}
           
          </Box>
        </Box>
      )}
    </div>
    )}
    </>
    
  );
}

export default TabPanel;
