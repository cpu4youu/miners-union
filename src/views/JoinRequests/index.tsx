import {
  Box,  
  Button,
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
} from "@mui/material";
import classnames from "classnames";
import { fetchTable, checkLogin, transaction } from "../../plugins/chain";
import { WalletContext } from "../../App";
import { smartcontract } from "../../config";

import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";

interface IRequest{
  key: number,
  timestamp: string,
  wallet: string
}

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});


function JoinRequests() {
  const {wallet} = useContext(WalletContext);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  const [rows, setRows] = useState<IRequest[]>([])
  
  const handleApprove = async(name: string) => {
    try{
      await checkLogin()
      const r = await transaction({
        actions: [{
          account: smartcontract,
          name: 'approvejoin',
          authorization: [{
            actor: wallet.name,
            permission: 'active',
          }],
          data: {
            wallet: wallet.name,
            request_wallet: name
          },
        }]
      })
      if(r){
        alert(`Approved ${name}!`)
      }
    }catch(e){
      alert(e)
    }
  }

  const handleDeny = async(name: string) => {
    try{
      let reason = prompt('Reason for rejection')
      await checkLogin()
      const r = await transaction({
        actions: [{
          account: smartcontract,
          name: 'denyjoin',
          authorization: [{
            actor: wallet.name,
            permission: 'active',
          }],
          data: {
            wallet: wallet.name,
            request_wallet: name,
            reason: reason?.toString()
          },
        }]
      })
      if(r){
        alert(`Denied ${name}!`)
      }
    }catch(e){
      alert(e)
    }
  }

  useEffect(() => {
    async function x(){
      try{  
        var requests: Array<IRequest> = []
        await checkLogin()
        const r = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "joinrequests",
          limit: 100
        })
        r.rows.map((value: any, key: number) => {
          const y1 = new Date(value.timestamp).toISOString().split("T")[0]
          const y2 = new Date(value.timestamp).toTimeString().split(" ")[0]
          console.log(y1, y2)
          requests.push({
            key: key,
            timestamp: y1 + " " + y2,
            wallet: value.wallet
          })
        })
        setRows(requests)

      }catch(e){
        alert(e)
      }
    }
    x()
  }, [])

  return (
    <Box display="flex" justifyContent="center" py="48px">
      <Box
        className={classnames(
          desktop ? classes.contentWrapper : "",
          mobile ? classes.mobileWrapper : ""
        )}
      >
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
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Join Request
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
                  Submitted on
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", background: "transparent" }}
                ></TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row?.key}                  
                >
                  <TableCell
                    align="left"
                    sx={{
                      p: "24px 16px",
                      fontSize: "20px",
                      color: "white",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row?.wallet}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "24px 16px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row?.timestamp}
                  </TableCell>   
                  <TableCell
                    align="right"
                    sx={{
                      p: "24px 16px",
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
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        onClick={()=> {
                          handleApprove(row.wallet)
                        }}
                        sx={{
                          px: "32px",
                          py: "4px",
                          color: "white",
                          mr: "12px",
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Oxanium Light",
                          border: "2px solid #FFB800",
                          boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                          borderRadius: "20px",
                          textTransform: "none",
                          background: "#FFB800",
                        }}                        
                      >
                        Approve
                      </Button>
                      <Button
                       onClick={()=> {
                        handleDeny(row.wallet)
                      }}
                        sx={{
                          px: "32px",
                          py: "4px",
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Oxanium Light",
                          border: "2px solid #BA0000",
                          boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                          borderRadius: "20px",
                          textTransform: "none",
                          background: "#BA0000",
                        }}                        
                      >
                        Deny
                      </Button>
                      </Box>                    
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

export default JoinRequests;
