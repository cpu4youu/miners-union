import {
  Box,
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
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

import velesprofile from "../../assets/imgs/velesprofile.png";


import { fetchTable} from "../../plugins/chain";
import { useEffect, useState } from "react";
import { smartcontract } from "../../config";


const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

interface IUser{
  key: number,
  name:string,
  votes: string,
  cpu: string,
  drops: string,
  other: string
}

interface IRanking{
  rank: number,
  name: string,
  contribution: string,
}

function createData(
  rank: number,
  name: string,
  contribution: string,
) {
  return { rank, name, contribution };
}

function Contributions() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  const [rows, setRows] = useState<IRanking[]>([])

  useEffect(() => {
    async function x (){
      let more = false
      let next = ""
      var voters: Array<IUser> = []
      do {
        const x = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "contribution",
          limit: 100,     
          lower_bound: next
      })
      next = x.next_key
      more = x.more 
      x.rows.map((value: any, key: any) => {
        voters.push({
          key: key,
          name: value.wallet,
          votes: value.votes,
          cpu: value.cpu,
          drops: value.drops,
          other: value.other
        })
        return 0
      })
      } while(more) 
      voters.sort(function(a, b){
        var keyA = Number(a.votes.slice(0, -4)) + Number(a.cpu.slice(0, -4)) + Number(a.drops.slice(0, -4)) + Number(a.other.slice(0, -4))
        var keyB = Number(b.votes.slice(0, -4)) + Number(b.cpu.slice(0, -4)) + Number(b.drops.slice(0, -4)) + Number(b.other.slice(0, -4))
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0
      })
      const rankes = voters.slice(0, 99);
      const y: Array<IRanking> = []
      rankes.map((value, key) => {
        var total = Number(value.votes.slice(0, -4)) + Number(value.cpu.slice(0, -4)) + Number(value.drops.slice(0, -4)) + Number(value.other.slice(0, -4))
        y.push(createData(key , value.name, total.toFixed(0) + " TLM"))
        return 0
      })
      console.log(y)
      setRows(y)
    }
    x()
  }, [])

  return (
    <>
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
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none", background: "transparent" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Contributor
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Total Contribution
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.rank}>
                    <TableCell
                      align="center"
                      sx={{
                        p: "6px 12px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {row.rank + 1}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      sx={{
                        p: "6px 12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* <img src={velesprofile} alt="" width={row.rank < 3 ? 72 : 60} /> */}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
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
                      {row?.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        p: "6px 12px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        borderRight: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {row.contribution}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default Contributions;
