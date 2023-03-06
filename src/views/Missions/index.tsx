
import { useCallback, useEffect, useState, useRef, useContext } from "react";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from "@mui/styles";
import MagorProfileIcon from "../../assets/imgs/margoprofile.png";
import Eyeke from "../../assets/imgs/eyekeprofile.png";
import MissionIcon from "../../assets/imgs/missionicon.png";
import VelesProfileIcon from "../../assets/imgs/velesprofile.png";
import NaronProfileIcon from "../../assets/imgs/naronprofile.png";
import SpaceshipIcon from "../../assets/icons/spaceship.png";

import { smartcontract } from "../../config";
import { fetchTable, transaction } from "../../plugins/chain";
import { WalletContext } from "../../App";

interface IMission{
  rank:number,
  key: number,
  creator: string,
  endtime: string,
  starttime: string
  reward: string,
  unclaimed: string,
  power: number,
}

interface IData{
  rank:number,
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
  mobileWrapper: {
    width: "100%",
  },
});

function createData(
  rank: number,
  key: number,
  icon: string,
  from: string,
  rewards: string,
  spaceships: number,
  timeremaining: string
) {
  return { rank, key, icon, from, rewards, spaceships, timeremaining };
}

function Missions() {
  const {wallet} = useContext(WalletContext)
  const [data, setData] = useState<IMission[]>([])
  const [rows, setRow] = useState<IData[]>([])
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  let navigate = useNavigate();
  const handleClickMenu = (link: string, key: number) => {
    if(data[key]){
      console.log(key)
      navigate(link, {
        state: {
          Data : data[key],
          time: rows[key].timeremaining
        },
        replace: true,
      });
    }
    
  };

  const handleClaim = async () => {
    if(wallet != null){
      const x = await transaction({
        actions: [{
          account: smartcontract,
          name: "claimtlm",
          authorization: [{
            actor: wallet.name,
            permission: 'active',
          }],
          data: {
            wallet: wallet.name,
          },
        }]
      })
      if(x){  
        alert("Succesfully claimed Mission")
      }
    }
  }
  
  const getData = useCallback(async () =>{
    let more = false
    let next = ""
    let mission: Array<IMission> = []
    do {
      const x = await fetchTable({
        json: true,
        code: smartcontract,
        scope: smartcontract,
        table: "tlmdrops",
        limit: 100,     
        lower_bound: next
    });
    next = x.next_key;
    more = x.more;
    console.log(x);
    x.rows.map((value: any, key: number) => {
      mission.push({
        rank: value.index,
        key: value.index,
        creator: value.creator,
        endtime: value.endtime,
        starttime: value.starttime,
        reward: value.rewards,
        unclaimed: value.total_power,
        power: value.total_power,
      });
    });
    } while(more) 
    setData(mission);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  function secondsToDhms(seconds: number) {
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    return dDisplay + " " + hDisplay + " " + mDisplay;
  }

  useEffect(() => {
    const missions: IData[] = []

    if(data){
      data.slice(0).reverse().map((value, key) => {
        var remaining = ""
        var time = new Date(value.endtime).getTime() / 1000
        var test = new Date().toISOString().replace('Z', '')
        var now = new Date(test).getTime() / 1000 
        var remain = Math.floor(time - now)

        if(remain > 0){
          const s = secondsToDhms(remain )
          remaining = s.substring(0, s.length-2)
          missions.push(
            createData(
            key,
            value.key,
            `${MissionIcon}`,
            value.creator,
            value.reward,
            value.power,
            remaining     
          ))
          
        } else {
          if (key < 15){
            remaining = "expired" //since: \n + s.substring(0, s.length-2)
            missions.push(
              createData(
              key,
              value.key,
              `${MissionIcon}`,
              value.creator,
              value.reward,
              value.power,
              remaining     
            ))
          }
        }
        
      })
      console.log(missions)
      setRow(missions)
    }
  }, [data]);

  return (
    <Box display="flex" justifyContent="center" py="48px">
      <Box
        className={classnames(
          desktop ? classes.contentWrapper : "",
          mobile ? classes.mobileWrapper : ""
        )}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
        >
        <Button
          onClick={handleClaim}
          sx={{
            display: "flex",
            background: "#009DF5",
            width: "180px",
            borderRadius: "20px",
            textAlign: "center",
            height: "38px",            
            textTransform: "none",
            color: "white",
            lineHeight: "0",
            fontSize: "18px",
            fontFamily: "Oxanium Medium",
            mt: "6px",
            alignItems: "center",
            "&: hover": { opacity: "0.9", background: "#009DF5" },
          }}
        >
          Claim Rewards
        </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ background: "transparent", boxShadow: "none" }}
        >
          <Table
            sx={{
              minWidth: 720,
              borderCollapse: "separate",
              borderSpacing: "0 12px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: "none", background: "transparent" }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  From
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Rewards
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Spaceships
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Time Remaining
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClickMenu("/missiondetails", row.key)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      p: "6px 12px",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <img src={row.icon} alt="" width="72px" />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.from}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.rewards}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <Box display="flex" justifyContent="flex-start">
                      <img src={SpaceshipIcon} alt="" width="28px" />
                      <Typography
                        px="12px"
                        fontSize="20px"
                        color="white"
                        sx={{ fontFamily: "0xanium Light" }}
                      >
                        {row.spaceships}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      p: "6px 12px",
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderRight: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.timeremaining}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Missions;
