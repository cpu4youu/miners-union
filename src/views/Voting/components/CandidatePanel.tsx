import { useEffect, useState, useContext, useCallback } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import isEqual from 'lodash.isequal';
import CandidateOneIcon from "../../../assets/imgs/candidateone.png";

import { smartcontract } from "../../../config";
import { fetchTable } from "../../../plugins/chain";
import { WalletContext } from "../../../App";

interface ICandidatePanelProps {
  desktop: boolean;
}

interface IData {
  icon: string,
  rank: number,
  candidate: string,
  wallet: string,
  votes: number,
  more: boolean
}

interface ICandidate{
  name: string
  votes: number
  full_name: string
  image: string
  more: boolean
}

interface IProfile{
  avg_vote_time_stamp : string,
  candidate_name : string,
  gap_filler : number,
  is_active: boolean,
  number_voters : number,
  rank : number,
  requestedpay : string
  running_weight_time : string
  total_vote_power: number,
}

function createData(
  icon: string,
  rank: number,
  candidate: string,
  wallet: string,
  votes: number,
  more: boolean
) {
  return { icon, rank, candidate, wallet, votes, more };
}

var old: Array<IData>= []

function CandidatePanel(props: ICandidatePanelProps) {
  const {claimed} = useContext(WalletContext)
  const { desktop } = props;
  const [data, setData] = useState(Array<IData>)
  let navigate = useNavigate();
  const handleClickMenu = (link: string, name: string) => {
    navigate(link, {
      state: {wallet: name},
      replace: true,
    });
  };

  async function getCandidate() {
    try {
      let more = false
      let next = ""
      let candi: Array<ICandidate> = []
      do {
        const x = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "ucandidates",
          limit: 10,     
          lower_bound: next
      })
      next = x.next_key
      more = x.more 
      x.rows.forEach((value: any, key: any) => {
        if(value.planet === "eyeke"){
          candi.push({name : value.wallet, votes: value.votes, full_name:"-", image: "-", more : false})
        }
      })
      } while(more) 

      more = false
      next = ""
      do{
        const x = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "candprofiles",
          limit: 1,
          lower_bound: next,
          upper_bound: next,
        })
        next = x.next_key
        more = x.more 
        const wallet = x.rows[0].wallet
        const name = x.rows[0].candidate
        const image = x.rows[0].profile_image
        candi.map((value, key)=>{
          if(value.name === wallet){
            candi[key] = {name: value.name, votes: value.votes, full_name: name, image: image, more: true}
          }
        })
      }while(more)
    return candi

    }catch(e){
      alert(e)
    }
  };

  const getData = useCallback(async () =>{
    const x: Array<ICandidate>| undefined = await getCandidate()
    if(x) {
      x.sort(function(a, b){
        var keyA = a.votes
        var keyB = b.votes
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0
      })
      const y: Array<IData>= []
      x.map(async (value, key) =>{
        var img = CandidateOneIcon
        if(value.image !=="-"){
          img = value.image
        }
        y.push(createData(`${img}`, key + 1, value.full_name, value.name, value.votes, value.more))
      })
      
      if(!isEqual(y, old)){
        setData(y)
        old = y
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() =>{
      getData()
    }, 10000);
    return () => (clearInterval(interval))
  }, [getData])

  useEffect(() =>{
    getData()
  },[getData])

 /*  useEffect(() => {
    async function x(){
      try {
        let more = false
        let next = ""
        var profiles: Array<IProfile> = []
        var dataold: Array<IData>= data
        do{
          const x = await fetchTable({
            json: true, 
            code: "dao.worlds",
            scope: "eyeke",
            table: "candidates",
            limit: 100,
            lower_bound: next,
            upper_bound: next,
          })
          next = x.next_key
          more = x.more
          x.rows.map((value: IProfile) =>{
            profiles.push(value)
          })
        }while(more)
       profiles.sort(compare) 
       data.map((value, key) => {
        profiles.map((prof, rank)=> {
          if(value.wallet === prof.candidate_name){
            console.log(dataold[key])
          }
        })
       })
      } catch(e){
      alert(e)
    }
  }
    x()
  }, [data]) */

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Table
          sx={{
            minWidth: 720,
            borderCollapse: "separate",
            borderSpacing: "0 8px",
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
                  p: "6px 12px",
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Candidate
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Wallet
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Votes
              </TableCell>
              <TableCell
                align="right"
                sx={{ borderBottom: "none", background: "transparent" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dat) => (
              <TableRow key={dat.rank}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    p: "6px 12px",
                    borderTopLeftRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <img src={dat.icon} alt="" width="64px" />
                  </Box>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {dat.rank}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {dat.candidate}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {dat.wallet}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {dat.votes}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    p: "6px 12px",
                    borderTopRightRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >{dat.more ? 
                <Button
                  sx={{
                    px: "32px",
                    py: "4px",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Oxanium Light",
                    border: "1px solid #FFFFFF",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
                  }}
                  onClick={() => handleClickMenu("/votingdetail", dat.wallet)}
                >
                  More
                </Button>
                :
                <></>}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function compare( a: IProfile, b: IProfile ) {
  var x = Number(a.total_vote_power)
  var y = Number(b.total_vote_power)
  if ( x < y){
    return 1;
  }
  if ( x > y ){
    return -1;
  }
  return 0;
}


export default CandidatePanel;
