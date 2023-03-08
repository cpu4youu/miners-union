import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Link,
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
import { makeStyles } from "@mui/styles";
import classnames from "classnames";
import { fetchTable } from "../../plugins/chain";
import { smartcontract } from "../../config";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

interface IProposal{
  archive_date: string,
  creation_date: string,
  description: string,
  from: string,
  memo: string,
  proposal_name: string,
  title: string,
  tlm: string,
  to: string,
  votes: number,
}

interface IRow{
  key: number,
  proposalTitle: string,
  proposalAmount: string,
  proposalAddress: string,
  votes: number,
  submissionDate: string,
  proposal_name: string
}

function createData(
  key: number,
  proposalTitle: string,
  proposalAmount: string,
  proposalAddress: string,
  votes: number,
  submissionDate: string,
  proposal_name: string,
) {
  return {
    key,
    proposalTitle,
    proposalAmount,
    proposalAddress,
    votes,
    submissionDate,
    proposal_name
  };
}

function Proposals() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  let navigate = useNavigate();
  const [rows, setRows] = useState<IRow[]>([])
  const handleClickMenu = (link: string, proposal_name: string) => {
    if(link === "/proposaldetails"){
      navigate(link, {
        state: {
          key : proposal_name,
        },
        replace: true,
      });
    } else {  
      navigate(link);
    }
  };

  useEffect(()=> {
    async function x() {
      let more = false
      let next = ""
      const proposals: Array<IProposal> = []
      const data: Array<IRow> = []
      do {
        const x = await fetchTable({
          json: true,
          code: smartcontract, 
          scope: smartcontract,
          table: "proposals",
          limit: 100,     
          lower_bound: next
        });
        next = x.next_key;
        more = x.more;
        x.rows.map((value: any)=> {
          proposals.push(value)
        })
      } while(more) 
      console.log(proposals)
      proposals.map((value: IProposal, key: number)=> {
        const now = Number(new Date().getTime() / 1000).toFixed(0)
        const end = Number(new Date(value.archive_date).getTime()/ 1000).toFixed(0)
        if(now > end){
          proposals.splice(key, 1)
        } else {
          const date = new Date(value.creation_date)
          const options = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          };
          //@ts-ignore
          const formatter = new Intl.DateTimeFormat('en-GB', options);
          const formattedDate = formatter.format(date);
          data.push(createData(key, value.title, value.tlm, value.from, value.votes, formattedDate, value.proposal_name))
        }
      })
      setRows(data)
    }
    x()
  },[])

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        py={desktop ? "64px" : "32px"}
      >
        <Box
          className={classnames(
            desktop ? classes.contentWrapper : "",
            mobile ? classes.mobileWrapper : ""
          )}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={mobile ? "column" : "row"}
            mb={desktop ? "48px" : "24px"}
          >
            <Typography
              fontFamily="Oxanium Medium"
              fontSize={desktop ? "40px" : "28px"}
              fontWeight={desktop ? "700" : "500"}
              lineHeight="1.1"
              pb={mobile ? "12px" : "0"}
              color="white"
            >
              View Proposals
            </Typography>
            <Link
              py="2px"
              display="flex"
              alignItems="flex-end"
              width={desktop ? "212px" : "152px"}
              sx={{
                textDecoration: "none",
                borderBottom: "1px solid rgba(255, 255, 255, 0.61)",
                cursor: "pointer",
              }}
              onClick={() => handleClickMenu("/createproposal", "")}
            >
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "28px" : "20px"}
                fontWeight={desktop ? "500" : "400"}
                lineHeight="1.1"
                color="white"
                sx={{ opacity: "0.7" }}
              >
                Create Proposal
              </Typography>
            </Link>
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
                    align="left"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Proposal
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
                    Votes
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
                    Submission Date
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none", background: "transparent" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.proposalTitle}>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
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
                      <Box
                        pr="12px"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        <Typography pb="6px">{row.proposalTitle}</Typography>
                        <Typography pb="6px" color="#FFB800">
                          {row.proposalAmount}
                        </Typography>
                        <Typography>{row.proposalAddress}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        {row.votes}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        {row.submissionDate}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
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
                          textTransform: "none",
                          background:
                            "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
                        }}
                        onClick={() => handleClickMenu("/proposaldetails", row.proposal_name)}
                      >
                        Details
                      </Button>
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

export default Proposals;
